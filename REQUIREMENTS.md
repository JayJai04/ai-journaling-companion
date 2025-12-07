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

| FR-UM-101 | The system should allow the user to create an account. The password should be hashed using SHA-256 and salts. |

| FR-UM-102 | The system should allow users to delete their accounts. |

| FR-UM-103 | The system should allow users to configure their name and bio. |

### "Getting Started" Program

| ID | Requirement |

| :--- | :--- |

| FR-GSP-101 | The system shall onboard the user to the app by providing instructions on how to use the app. |

### Journal Entry History

| ID | Requirement |

| :--- | :--- |

| FR-JE-101 | The system should keep track of user journal entries, specifically the time and content. |

| FR-JE-102 | The system should support CRUD operations for the entries. |

### AI Insights

| ID | Requirement |

| :--- | :--- |

| FR-AI-101 | The system should generate an AI insight weekly based on mood, content, and time of journal entries. |

| FR-AI-102 | The system should generate AI insights when prompted by the user, with the capability to engage in a conversation, like a chatbot. |

### Reminder Tool

| ID | Requirement |

| :--- | :--- |

| FR-RT-101 | The user should get daily notifications at a certain time of day to journal with a fun message. |

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

| Relational Database | Postgres | |

| NoSQL Database | MongoDB | |

### Operating Environment

This project will be a web app.

## Future Enhancements

In the future, the UI will be much more streamlined, allowing users to have 5 minutes of focused writing time. Also, the AI will be able to reply with faster, more frequent user-generated insights.
