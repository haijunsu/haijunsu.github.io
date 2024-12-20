---
title: Using IBM MQ with Springboot
author: Haijun (Navy) Su
layout: post
tags: [mq, messaging, ibm, java, spring, springboot]
---

## Add dependencies

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
</dependency>
<dependency>
    <groupId>com.ibm.mq</groupId>
    <artifactId>com.ibm.mq.allclient</artifactId>
    <version>9.1.4.0</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jms</artifactId>
</dependency>
```

## Configure IBM MQ properties

```properties
ibm.mq.queueManager=QM1
ibm.mq.channel=DEV.ADMIN.SVRCONN
ibm.mq.connName=localhost(1414)
ibm.mq.user=admin
ibm.mq.password=passw0rd
ibm.mq.queue=DEV.QUEUE.1
```

## Create Configuration Class

Define the configuration class to connect IBM MQ:

```java
import com.ibm.mq.jms.MQConnectionFactory;
import com.ibm.msg.client.wmq.WMQConstants;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.core.JmsTemplate;

@Configuration
@EnableJms
public class MQConfig {

    @Bean
    public MQConnectionFactory mqConnectionFactory() {
        MQConnectionFactory factory = new MQConnectionFactory();
        try {
            factory.setHostName("localhost");
            factory.setPort(1414);
            factory.setQueueManager("QM1");
            factory.setChannel("DEV.ADMIN.SVRCONN");
            factory.setTransportType(WMQConstants.WMQ_CM_CLIENT);
            factory.setStringProperty(WMQConstants.USERID, "admin");
            factory.setStringProperty(WMQConstants.PASSWORD, "passw0rd");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return factory;
    }

    @Bean
    public JmsTemplate jmsTemplate() {
        return new JmsTemplate(mqConnectionFactory());
    }
}
```

## Create Producer class

Define a class to send messages to the queue.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class MQProducer {

    @Autowired
    private JmsTemplate jmsTemplate;

    private final String queueName = "DEV.QUEUE.1";

    public void send(String message) {
        jmsTemplate.convertAndSend(queueName, message);
    }
}
```

## Create Consumer class

Define a class to receive messages from the queue.

```java
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Component
public class MQConsumer {

    @JmsListener(destination = "DEV.QUEUE.1")
    public void receive(String message) {
        System.out.println("Received message: " + message);
    }
}
```

## Springboot Application

Create the main application class to run the Springboot application.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MqApplication implements CommandLineRunner {

    @Autowired
    private MQProducer producer;

    public static void main(String[] args) {
        SpringApplication.run(MqApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        producer.send("Hello, IBM MQ!");
    }
}
```
