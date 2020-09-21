FROM node:13.12.0-alpine
# Устанавливаем рабочую директорию
WORKDIR /app
# Копируем файлы yarn.lock и package.json в рабочую директорию
COPY . .
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install --silent
RUN npm install react-scripts@3.4.3 -g --silent

# Устанавливаем зависимости
# RUN yarn install
# Открываем порт 3000
EXPOSE 3000
# Запускаем React-приложение после запуска контейнера
CMD ["npm", "start"]