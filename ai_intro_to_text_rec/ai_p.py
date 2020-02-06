import numpy as np
import cv2
from cv2 import MSER as mser
from sklearn.svm import SVC
import keras
import os
from keras.datasets import fashion_mnist
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras.models import model_from_json
from keras import backend as K
import random
from sklearn.metrics import classification_report
import cPickle as pickle
from sklearn.metrics import confusion_matrix

def main():
  regions_of_interest = load_actual_images()
  trained_images, trained_labels, test_images, test_labels = load_alpha_images()
  
  train_svm(trained_images, trained_labels, test_images, test_labels)
  train_cnn(trained_images, trained_labels, test_images, test_labels)

  svc = pickle.load(open('svc.p', 'rb'))
  json_file = open('model.json', 'r')
  loaded_model_json = json_file.read()
  json_file.close()
  cnn = model_from_json(loaded_model_json)
  cnn.load_weights("model.h5")
  print("Loaded model from disk")
  cnn.compile(loss=keras.losses.categorical_crossentropy, optimizer=keras.optimizers.Adadelta(), metrics=['accuracy'])

  length_of_regions_of_interest = len(regions_of_interest)
  svc_predictions = []
  cnn_predictions = []
  i = 0
  while i < length_of_regions_of_interest:
    if (len(regions_of_interest[i]) == 0):
      i = i + 1
    if (len(regions_of_interest[i]) == 0):
      i = i + 1
    if (len(regions_of_interest[i]) == 0):
      i = i + 1
    predict_me_svc = regions_of_interest[i].reshape((len(regions_of_interest[i]), 2500))
    predict_me_cnn = np.zeros((len(regions_of_interest[i]), len(regions_of_interest[i][0]), len(regions_of_interest[i][0][0]), 1))

    length_of_cnn_images = len(predict_me_cnn)
    length_of_cnn_rows = len(predict_me_cnn[0])
    length_of_cnn_columns = len(predict_me_cnn[0][0])
    z = 0
    while z < length_of_cnn_images:
      j = 0
      while j < length_of_cnn_rows:
        k = 0
        while k < length_of_cnn_columns:
          predict_me_cnn[z][j][k][0] = regions_of_interest[i][z][j][k]
          k = k + 1
        j = j + 1
      z = z + 1
    predict_me_cnn = predict_me_cnn.astype('float32')
    predict_me_cnn = predict_me_cnn / 255.0
    svc_predictions.append(svc.predict(predict_me_svc))
    cnn_predictions.append(cnn.predict_classes(predict_me_cnn))
    print(i)
    print(svc_predictions[i])
    print(cnn_predictions[i])
    j = 0
    while j < len(regions_of_interest[i]):
      img_path = 'image4letter' + str(i+1) + "," + str(j+1) + '.jpg'
      cv2.imwrite(img_path, regions_of_interest[i][j])
      j = j + 1
    i = i + 1


def train_svm(trained_images, trained_labels, test_images, test_labels):
  trained_images = trained_images.reshape((len(trained_images), 2500))
  test_images = test_images.reshape((len(test_images), 2500))
  #svc = SVC(C = 100, verbose=True, max_iter = 10000)
  #svc.fit(trained_images, trained_labels)
  #pickle.dump(svc, open('svc.p', 'wb'))
  svc = pickle.load(open('svc.p', 'rb'))
  output = svc.score(test_images, test_labels)
  print(output)

def train_cnn(trained_images, trained_labels, test_images, test_labels):
  batch_size = 30
  num_classes = 62
  epochs = 15
  normalized_trained_images = np.zeros((len(trained_images), len(trained_images[0]), len(trained_images[0][0]), 1))

  length_of_trained_images = len(trained_images)
  length_of_trained_rows = len(trained_images[0])
  length_of_trained_columns = len(trained_images[0][0])
  i = 0
  while i < length_of_trained_images:
    j = 0
    while j < length_of_trained_rows:
      k = 0
      while k < length_of_trained_columns:
        normalized_trained_images[i][j][k][0] = trained_images[i][j][k]
        k = k + 1
      j = j + 1
    i = i + 1
  
  normalized_test_images = np.zeros((len(test_images), len(test_images[0]), len(test_images[0][0]), 1))

  length_of_test_images = len(test_images)
  length_of_test_rows = len(test_images[0])
  length_of_test_columns = len(test_images[0][0])
  i = 0
  while i < length_of_test_images:
    j = 0
    while j < length_of_test_rows:
      k = 0
      while k < length_of_test_columns:
        normalized_test_images[i][j][k][0] = test_images[i][j][k]
        k = k + 1
      j = j + 1
    i = i + 1

  input_shape = (length_of_trained_rows, length_of_trained_columns, 1)

  trained_images = normalized_trained_images.astype('float32')
  test_images = normalized_test_images.astype('float32')
  trained_images = trained_images / 255.0
  test_images = test_images / 255.0

  trained_labels = keras.utils.to_categorical(trained_labels, num_classes)
  test_labels = keras.utils.to_categorical(test_labels, num_classes)

  #model = Sequential()
  #model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape = input_shape))
  #model.add(Conv2D(64, (3, 3), activation='relu'))
  #model.add(MaxPooling2D(pool_size=(2, 2)))
  #model.add(Dropout(0.25))
  #model.add(Flatten())
  #model.add(Dense(128, activation='relu'))
  #model.add(Dropout(0.5))
  #model.add(Dense(num_classes, activation='softmax'))

  #model.compile(loss=keras.losses.categorical_crossentropy, optimizer=keras.optimizers.Adadelta(), metrics=['accuracy'])
  #model.fit(trained_images, trained_labels, batch_size=batch_size, epochs=epochs, verbose=1, validation_data=(test_images, test_labels))
  #score = model.evaluate(test_images, test_labels, verbose=1)
  #print('Test loss:', score[0])
  #print('Test accuracy:', score[1])
  
  #serialize model to JSON
  #model_json = model.to_json()
  #with open("model.json", "w") as json_file:
  #  json_file.write(model_json)
  #model.save_weights("model.h5")
  #print("Saved model to disk")
 
  json_file = open('model.json', 'r')
  loaded_model_json = json_file.read()
  json_file.close()
  loaded_model = model_from_json(loaded_model_json)
  loaded_model.load_weights("model.h5")
  print("Loaded model from disk")
  
  loaded_model.compile(loss=keras.losses.categorical_crossentropy, optimizer=keras.optimizers.Adadelta(), metrics=['accuracy'])
  score = loaded_model.evaluate(test_images, test_labels, verbose=0)
  print("%s: %.2f%%" % (loaded_model.metrics_names[1], score[1]*100))

def load_actual_images():
  path = "ProjectImages"
  _, _, files = next(os.walk(path))
  file_count = len(files)
  images = []
  cp_images = []
  image_after_edges = []
  contour_collection = []
  i = 1
  while i <= file_count:
    temp_path = path + '/img'
    if i < 10:
      temp_path = temp_path + '00' + str(i) +'.jpg'
    elif i < 100:
      temp_path = temp_path + '0' + str(i) + '.jpg'
    else:
      temp_path = temp_path + str(i) + '.jpg'
    images.append(cv2.imread(temp_path, 0))
    cp_images.append(images[i-1])
    image_after_edges.append(cv2.Canny(images[i-1], 100, 200))
    contours, _ = cv2.findContours(image_after_edges[i-1], cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    contour_collection.append(contours)
    i = i + 1
  
  regions_of_interest = []
  i = 0
  length_of_contour_collection = len(contour_collection)
  while i < length_of_contour_collection:
    j = 0
    length_of_contours = len(contour_collection[i])
    regions_of_interest_for_picture = []
    regions_of_interest.append([])
    while j < length_of_contours:
      x, y, w, h = cv2.boundingRect(contour_collection[i][j])
      aspect_ratio = float(w) / float(h)
      area = cv2.contourArea(contour_collection[i][j])
      rectangle_area = float(w) * float(h)
      extent = float(area) / rectangle_area
      hull = cv2.convexHull(contour_collection[i][j])
      hull_area = cv2.contourArea(hull)
      if hull_area == 0.0:
        hull_area = 1.0
      solidity = float(area) / float(hull_area)
      if w > len(images[i][0]) / 20 and w < len(images[i][0]) / 3 and h > 10 and h < len(images[i]) / 3 and len(images[i]) / 20 and aspect_ratio > 0.2 and aspect_ratio < 5 and extent > 0.05 and extent < 0.95 and solidity > 0.1:
        regions_of_interest_for_picture.append(contour_collection[i][j])
        regions_of_interest[i].append(cv2.resize(images[i][y:y+h, x:x+w], (50, 50)))
      j = j + 1
    contour_collection[i] = regions_of_interest_for_picture
    regions_of_interest[i] = np.array(regions_of_interest[i])
    i = i + 1
  
  i = 0
  length_of_images = len(images)
  while i < length_of_images - 1:
    #print(len(contour_collection[i]))
    #temp_image = cv2.drawContours(cp_images[i], contour_collection[i], -1, (0, 255, 0), 5)
    #cv2.imshow('image', temp_image)
    #cv2.waitKey(1)
    #cv2.destroyAllWindows()
    i = i + 1
  regions_of_interest = np.array(regions_of_interest)
  return regions_of_interest

def load_alpha_images():
  i = 1
  trained_images = []
  trained_labels = []
  test_images = []
  test_labels = []
  while i <= 62:
    temp_number = '0'
    if i < 10:
      temp_number = '0' + str(i)
    else:
      temp_number = str(i)
    path = 'English/Img/GoodImg/Bmp/Sample0' + temp_number
    path, _, files = next(os.walk(path))
    file_count = len(files)
    j = 1
    while j <= file_count:
      specific_temp_path = '0'
      if j < 10:
        specific_temp_path = '0000' + str(j) + '.png'
      elif j >= 10 and j < 100:
        specific_temp_path = '000' + str(j) + '.png'
      elif j >= 100 and j < 1000:
        specific_temp_path = '00' + str(j) + '.png'
      else:
        specific_temp_path = '0' + str(j) + '.png'
      specific_path = path + '/img0' + temp_number + '-' + specific_temp_path
      if j < file_count * 0.9:
        trained_images.append(cv2.resize(cv2.imread(specific_path, 0), (50, 50)))
        trained_labels.append(i-1)
      else:
        test_images.append(cv2.resize(cv2.imread(specific_path, 0), (50, 50)))
        test_labels.append(i-1)
      j = j + 1
    i = i + 1
  
  trained_images = np.array(trained_images)
  trained_labels = np.array(trained_labels)
  test_images = np.array(test_images)
  test_labels = np.array(test_labels)
  return trained_images, trained_labels, test_images, test_labels

main()
