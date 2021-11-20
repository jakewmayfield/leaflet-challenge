# Leaflet Challenge

## Overview
In this challenge, I create a visualization regarding earthquakes for the USGS.  The USGS is responsible for providing scientific data about natural hazards, the health of ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. 


### Basic Visualization

My workflow process had two major steps:

1. **Get The Data Set**

    * I used D3 to read in the geojson format provided by (http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php), which is one of many earthquake feeds that provide new data every 5 minutes.

2. **Import & Visualize the Data**

   I created a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

   * The data markers reflect the magnitude of the earthquake by their size and depth of the earthquake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.
   * Popups provide additional information about the earthquake when a marker is clicked.
   * A legend provides context for the map data.