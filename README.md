# GreenCREDIT
The home of the GreenCREDIT Network project. GreenCREDIT aims to be an open architecture for a network backend exposed as a set of RESTful API services. With GreenCREDIT Network, we aim to bring credit rewards to green activists and allow green companies and green funders to fund the activities for the activists.

## Tech Stack
RESTful API backend built with Django REST Framework, front-end app code written in React Native and database as PostgreSQL/CockroachDB

## Business Entities

### Personas
* Activist
	* Performs the green activities to make the earth a greener place and save it before time runs out. The real hero.
* Entity
	* A company or an entity that brings green products or services to the world
* Funder
	* A person or a company contributing funds or resources with the intent of making the work d a greener place, and would like to enable the green activists to become successful in their work

### Object Model
* Activity
	* A single and measurable act of kindness to save the planet. Only an Activity can generate GreenCREDITs.
* Campaign
	* A string of activities performed by multiple activists to achieve a common goal
* CreditLedger
	* A ledger of GreenCREDITs credited and debited
* Reward
	* A product/service or discount that can be redeemed with GreenCREDITs. Ledger entry is made for the Entity that is providing the rewards against the GreenCREDIT

## Business Actions
* Signup / Signin (Activity/Entity/Funder)
* Post Activity
* Upvote Activity
* Post Campaign
* Start Campaign
* End Campaign
* Fund Campaign
* Credit/Debit GreenCREDITs
