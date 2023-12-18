msg.city = msg.payload.location;
msg.weather = msg.payload.weather;
msg.weatherDetail = msg.payload.detail;
msg.windspeed = msg.payload.windspeed;
msg.humidity = msg.payload.humidity;
msg.tempc = msg.payload.tempc;
msg.temp_maxc = msg.payload.temp_maxc;
msg.temp_min = msg.payload.temp_min;

return msg;
