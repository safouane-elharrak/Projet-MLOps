FROM python3.7

COPY . /app

WORKDIR /app

RUN pip install fastapi
RUN pip install uvicorn
RUN pip install numpy
RUN pip install pandas
RUN pip install tensorflow
RUN pip install nest-asyncio

EXPOSE 8000

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
