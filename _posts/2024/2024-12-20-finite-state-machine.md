---
title: Finite State Machine
author: Haijun (Navy) Su
layout: post
tags: [java, finite, state, machine]
---

## What is the Finite State Machine (FSM)?

A **Finite State Machine (FSM)** is a computational model used to design and analyze the behavior of systems. It consists of a finite number of states, transitions between those states, and actions. FSMs are commonly used in computer science, engineering, and related fields to model the behavior and digital circuits, software, and other systems. Finite State Machines are powerful tools for modeling and analyzing the behavior of systems with a finite number of states and will-defined transitions. They help ensure that the system behaves predictably and correctly in response to different inputs.

### Key Components of an FSM

* **State**: Distinct conditions or configurations that the system can be in.
* **Transitions**: Rules that determine how the system moves from one state to another, usually based on inputs or conditions.
* **Input Alphabet**: A set of symbols or inputs that trigger transitions between states.
* **Initial State**: The state in which the FSM starts.
* **Final State(s)**: One or more states that signify the completion of the process or task.

### Example

The behavior of a turnstile at subway station. The turn stile has two states: `Locked` and `Unlocked`.

* **State**: Locked, Unlocked
* **Input Alphabet**: Coin, Push
* **Initial State**: Locked
* **Transitions**:
  * From `Locked` to `Unlocked` on receiving a `Coin`.
  * From `Unlocked` to `Locked` on receiving a `Push`.

**FSM Diagram**:

```shell
[Locked] -- (Coin) --> [Unlocked]
[Unlocked] -- (Push) --> [Locked]
```

## Applications of FSMs

* **Digital Circuit Design**: FSMs are used to design sequential logic circuits.
* **Software Engineering**: FSMs model the behavior of software components, user interfaces and protocols.
* **Game Development**: FSMs control the behavior of game characters and objects.
* **Robotics**: FSMs manage the states and transitions of robotic systems.

## FSM using in JAVA Example

Let's model a simple FSM that represent a turnstile with two states: `Locked` and `Unlocked`.

* Step 1: Define the states

```java
enum State {
    LOCKED,
    UNLOCK
}
```

* Step 2: define the Event

```java
enum Event {
    COIN,
    PUSH
}
```

* Step 3: define the FSM

```java
public class TurnstileFSM {

    private State currentState;

    public TurnstileFSM() {
        this.currentState = State.LOCKED;
    }

    public void handleEvent(Event event) {
        switch (this.currentState) {
            case State.LOCKED -> {
                if (event == State.COIN) {
                    this.currentState = State.UNLOCKED;
                    System.out.println("Unlocked");
                } else {
                    System.out.println("You need to insert a coin first.");
                }
            }
            case State.UNLOCKED -> {
                if (event == State.PUSH) {
                    this.currentState = State.LOCKED;
                    System.out.println("Locked");
                } else {
                    System.out.println("Already unlocked. You can push.");
                }
            }
        }
    }

    public State getCurrentState() {
        return this.currentState;
    }

    public static void main(String[] args) {
        TurnstileFSM fsm  = new TurnstileFSM();
        System.out.println("Initial state: " + fsm.getCurrentState());

        fsm.handleEvent(Event.PUSH);
        fsm.handleEvent(Event.COIN);
        fsm.handleEvent(Event.PUSH);

        System.out.println("Final state: " + fsm.getCurrentState());
    }
}
```

## FSM using in Java with schema support

* Step 1: Define the Schema (FSMConfig.json)

```json
{
    "initialState": "LOCKED",
    "states": {
        "LOCKED": {
            "on": {
                "COIN": "UNLOCKED"
            }
        },
        "UNLOCKED": {
            "on": {
                "PUSH": "LOCKED"
            }
        }
    }
}
```

* Step 2: Enhance the FSM Class in Java

```java
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.Map;

enum State {
    LOCKED,
    UNLOCKED
}

enum Event {
    COIN,
    PUSH
}

public class DynamicFSM {

    private State currentState;
    private Map<String, Map<String, String>> statesConfig;

    public DynamicFSM(String configFilePath) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode config = mapper.readTree(new File(configFilePath));

        this.currentState = State.valueOf(config.get("initialState").asText());
        this.statesConfig = mapper.convertValue(config.get("states"), Map.class);
    }

    public void handleEvent(String event) {
        Map<String, String> transitions = statesConfig.get(currentState.name()).get("on");
        String nextState = transitions.get(event);
        if (nextState != null) {
            currentState = State.valueOf(nextState);
            System.out.println("Transitioned to: " + currentState);
        } else {
            System.out.println("Invalid event: " + event);
        }
    }

    public State getCurrentState() {
        return currentState;
    }

    public static void main(String[] args) {
        try {
            DynamicFSM fsm = new DynamicFSM("FSMConfig.json");
            System.out.println("Initial state: " + fsm.getCurrentState());

            fsm.handleEvent("PUSH");  // Should print: "Invalid event: PUSH"
            fsm.handleEvent("COIN");  // Should print: "Transitioned to: UNLOCKED"
            fsm.handleEvent("PUSH");  // Should print: "Transitioned to: LOCKED"

            System.out.println("Final state: " + fsm.getCurrentState());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
