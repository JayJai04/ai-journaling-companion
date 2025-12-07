# AI Journaling Companion v0

## Introduction

### Purpose

This document outlines functional and non-functional requirements for the *AI Powered Journaling Companion*.

### Scope

This app stores journal entries and uses AI to generate insights into a specific user’s behavior. Here’s an example of an insight:

"[Name], it seems like you’re more stressed on Monday, mainly because it’s the start of the week. Do you want some quick breathing tips?"

I won’t be including multimedia support for v0 because I want the user to describe their emotions precisely with words.

### Definitions/Acronyms

| Acronym | Definition |

| :--- | :--- |

| Thinker | The LLM that will generate insights. |

## Functional Requirements

### User Management

| ID | Requirement |

| :--- | :--- |

| FR-UM-101 | The system should allow the user to create and delete an account. The password should be hashed using bcrypt. |

| FR-UM-102 | The system should allow users to login/logout. Also, there should be a way to reset password. |

| FR-UM-103 | The system should allow users to configure their name and bio (textbox). |

| FR-UM-104 | The system should assign users JWTs for session authentication. |

### "Getting Started" Program

| ID | Requirement |

| :--- | :--- |

| FR-GSP-101 | The system shall onboard the user to the app by requiring users to read a document of instructions on how to use the app (by me). |

### Journal Entry History

| ID | Requirement |

| :--- | :--- |

| FR-JE-101 | The system should keep track of user journal entries, specifically the time and content. |

| FR-JE-102 | The system should support CRUD operations for the entries. |

### AI Insights

| ID | Requirement |

| :--- | :--- |

| FR-AI-101 | Thinker should generate an insight weekly based on mood, content, and time of journal entries via in-app notification service. |


| FR-AI-102 | Thinker should generate insights when prompted by the user, with the capability to engage in a conversation, like a chatbot. |
### Reminder Tool

| ID | Requirement |

| :--- | :--- |

| FR-RT-101 | The user should get (optional) daily notifications at a user-specified time of day to journal with a fun message via in-app notification service|

## Non-Functional Requirements

### Cloud

The system should be deployed on Vercel to allow users to access the app.

## Technical Requirements

### Tech Stack

| Component | Technology | Role |

| :--- | :--- | :--- |

| Full-stack | NextJS | |

| Frontend | React | |

| Runtime | NodeJS | |

| API Specification | OpenAPI | |

| Hosting | Vercel | |

| LLM Provider | Gemini | |

| Authentication | JWT | |

| Object Relational Mapping Software | PrismaORM | |

| Relational Database | Postgres | Users | |

| NoSQL Database | MongoDB | Journal Entires| |

### Operating Environment

This project will be a web app.

## Future Enhancements

In the future, the UI will be much more streamlined, allowing users to have 5 minutes of focused writing time. Also, the AI will be able to reply with faster, more frequent user-generated insights.
