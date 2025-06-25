<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

[![Product Name Screen Shot][product-screenshot2]](https://example.com)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="public/logo.png" alt="Logo" width="100" height="100">
  </a>

  <h1 align="center">Litlang</h1>

  <p align="center">
    A platform to access study material, read content, and write blogs.
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a a="#Features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot1]](https://example.com)

LitLang is a web platform designed for students, readers, and writers who want to explore educational content and share their thoughts.

It offers subject-wise study material like PDFs and audio files for students. Readers can read Books, Articles, Texts. All resources can be opened and used directly on the website without needing to download them locally in your machine.

LitLang also comes with Litera AI, which allows the readers to ask questions about the currently opened PDF to quickly understand the content without searching through pages.

Writers can log in, use the easy editor to write blogs, and publish them in only one click for others to read.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features

- Smart PDF assistant (Litera AI) to interact with study material in real time
- Fuzzy search to quickly find books, articles, and study content
- Notion-style blog editor for smooth writing and publishing experience
- Clean, modern interface with responsive design for better usability
- Built-in document and audio viewer with no download needed
- Organized access to diverse educational content in one place
- Contact form for easy communication and feedback from users

### Built With

| Layer        | Technology   | Purpose                                                           |
| ------------ | ------------ | ----------------------------------------------------------------- |
| **Frontend** | [![React][React.js]][React-url]        | UI library for building interactive components                    |
|              | [![Tailwind][Tailwind-CSS]][Tailwind-url] | Utility-first CSS framework for custom styling                    |
|              | [![Shadcn][Shadcn-ui]][Shadcn-url]    | Prebuilt modern components for consistent and clean UI            |
| **Backend**  | [![Next][Next.js]][Next-url]                  | Full-stack React framework with built-in routing and SSR          |
|              | [![Mongodb][Mongodb]][Mongodb-url]            | NoSQL database for storing and managing data inventory data       |
|              | [![Clerk.js][Clerk.js]][Clerk-url]                  | For handling user authentication.                       |
|              | [![Brevo][Brevo]][Brevo-url]                  | To recieve emails from the users                       |
|              | [![S3][S3]][S3-url]                  | Hosting and serving files                       |
|              | [![UploadThings][UploadThings]][UploadThings-url]                  | To upload and serve images used in blogs                       |
|              | [![Langchain][Langchain.js]][Langchain-url]                  |  To connect with LLMs and build RAG pipelines.                      |
|              | [![Voyage][Voyage]][Voyage-url]                  | As embeddings model                       |
|              | [![Pinecone][Pinecone]][Pinecone-url]                  | For retrieval and storing vector embeddings                        |
|              | [![Cohere][Cohere]][Cohere-url]                  | LLM for response generation based on retrieved results                       |

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get started and have the project running on your own local machine, follow the instructions mentioned below;

### Prerequisites

This is a list of tools you must have installed in your machine before proceeding:

- [git (Version Control)](https://git-scm.com)
- [Node.js (Javascript running environment)](https://nodejs.org/en)
- [npm (Node Package Manager)](https://www.npmjs.com)

### Installation

Follow these steps to install the project and its dependencies in your machine:

1. Clone the repo
   ```sh
   git clone https://github.com/yousuf123456/Litlang.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Get your technologies credentials by creating an account on the following platforms:
   - [MongoDB](https://www.mongodb.com/)
   - [Clerk.js](https://clerk.com/)
   - [Brevo](https://www.brevo.com/)
   - [AWS-S3](https://aws.amazon.com/s3)
   - [UploadThings](https://uploadthing.com/)
   - [Voyage](https://www.voyageai.com/)
   - [Pinecone](https://www.pinecone.io/)
   - [Cohere](https://cohere.com/)
4. Add your obtained credentials in your `.env.local` file as.
   ```
   DATABASE_URL=mongo_database_url;

   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key;
   WEBHOOK_SECRET_KEY=webhook_secret_key;
   CLERK_SECRET_KEY=clerk_secret_key;
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in;
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up;

   UPLOADTHING_SECRET=uploadthings_secret_key;
   UPLOADTHING_APP_ID=your_app_id;

   BREVO_API_KEY=brevo_api_key;

   S3_ACCESS_KEY=access_key;
   S3_SECRET_ACCESS_KEY=s3_secret_key;

   COHERE_API_KEY=cohere_api_key;
   VOYAGE_API_KEY=voyage_api_key;
   PINECONE_API_KEY=pinecone_api_key;
   ```
5. Create a webhook in Clerk Dashboard to sync user data with our mongo database.
   - Visit [Clerk.js Webhook Guide](https://clerk.com/blog/webhooks-getting-started) and follow the instructions.
   - Make sure to add your's hosted domain or ngrok forwarding url (for testing in local development) as webhook endpoint.
7. Run the local server.
   ```
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Usage Guide: For **Readers :notebook:** | **Writers :black_nib:** | **Admins :open_file_folder:**

### For Readers :notebook:
1. **Explore Contents**
   - Browse Subjects → Click any PDF/Audio → Read/listen directly in your browser.
     
   - Browse Books, Articles, Texts, Book Reviews → Click to open in the browser.
     
   - Browse blogs → Click to read through the blog.
          
2. **Ask Litera AI About Your PDF (Only for "Subjects" PDFs)**
   - Open a PDF → Click the Litera Ai button
     
   - Ask questions like:
     - "Summarize page 10"
       
     - "Explain the key concepts in this chapter"
       
     - "Find all mentions of 'climate change' in this document"
<br />

###  For Blog Writers :black_nib:
1. Log in → Go to "Write Blog"
   
2. Write using our Notion-style editor (rich formatting, embeds)
  
3. Hit "Publish" or save as a draft.
   
4. If not published immediatly, wait for the Blog to be approved by Admin.

### For Admins :open_file_folder:

#### Uploading Content
Follow this folder blueprint to upload your files in s3 bucket so content shows up correctly in the website:
```markdown
# Subjects Files

litlang-bucket/
├── Subjects/
│   ├── [Subject Name]/
│   │   ├── cover.jpg → [Displays as subject thumbnail on UI]
│   │   ├── chapter1.pdf
│   │   └── Lectures/ → [Nested folders allowed in subjects]
│   │       └── lecture1.mp3


# Books, Articles, Texts

litlang-bucket/
├── [Books/Articles/Texts]/
│   ├── [Book/Article/Text Name]/
│   │   ├── cover.jpg → [Displays as content thumbnail on UI]
│   │   ├── content.pdf


# Already Uploaded Books' Reviews

litlang-bucket/
├── Books/
│   ├── [Book Name]/
│   │   ├── cover.jpg 
│   │   ├── content.pdf
│   │   └── Book Reviews/
│   │       ├── [Book Review Title]/
│   │       │   ├── cover.jpg → [Displays as review thumbnail on UI]
│   │       │   └── review.pdf


# Not Uploaded Books' Reviews

litlang-bucket/
├── Outside Book Reviews/
│   ├── [Book Review Name]/
│   │   ├── cover.jpg → [Displays as review thumbnail on UI]
│   │   ├── review.pdf
```
3. **Syncing Content**
   
4. **Ai Processing of PDFs**
   
5. **Folder Structure of Project**
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Make Litera Ai also answer on audio files.
- [ ] Add support for video files.

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

💡 Got ideas or improvements? Your contributions are welcome that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

Currently, I have solely worked on this web app.
Be the first one to join me in shaping this project better😊.

<a href="https://github.com/yousuf123456/Litlang/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yousuf123456/Litlang" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the Unlicense License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Muhammad Yousuf - [Linkedin](www.linkedin.com/in/muhammad-yousuf-dev) - m.yousuf.developer@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot1]: https://psiatxsp7k.ufs.sh/f/IJ6jQX6fzbj8vpgm7x1kQ0fx5o4P6RE1OUe2pwanbvzCjc3r
[product-screenshot2]: https://psiatxsp7k.ufs.sh/f/IJ6jQX6fzbj8d5LI8KoprzQCLIK7MbtoW8TyAwlUDNuhnpYS
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind-CSS]: https://img.shields.io/badge/Tailwind.CSS-007FFF?style=for-the-badge&logo=tailwindcss&logoColor=white&logoSize=auto
[Tailwind-url]: https://tailwindcss.com/
[Mongodb]: https://img.shields.io/badge/Mongodb-00684A?style=for-the-badge&logo=mongodb&logoColor=B1FF05&logoSize=auto
[Mongodb-url]: https://www.mongodb.com/
[Shadcn-ui]: https://img.shields.io/badge/shadcnui-000000?style=for-the-badge&logo=shadcnui&logoColor=white&logoSize=auto
[Shadcn-url]: https://ui.shadcn.com/
[Clerk.js]: https://img.shields.io/badge/clerk.js-262626?style=for-the-badge&logo=clerk&logoColor=6C47FF&logoSize=auto
[Clerk-url]: https://clerk.com
[Langchain.js]: https://img.shields.io/badge/langchain.js-1C3C3C?style=for-the-badge&logo=langchain&logoColor=ffffff&logoSize=auto
[Langchain-url]: https://js.langchain.com/
[Brevo]: https://img.shields.io/badge/brevo-0B996E?style=for-the-badge&logo=brevo&logoColor=ffffff&logoSize=auto
[Brevo-url]: https://www.brevo.com/
[Cohere]: https://img.shields.io/badge/cohereai-ffffff?logo=data:image/svg%2bxml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxuczp4PSJuc19leHRlbmQ7IiB4bWxuczppPSJuc19haTsiIHhtbG5zOmdyYXBoPSJuc19ncmFwaHM7IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDc1IDc1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA3NSA3NTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KICAuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzM5NTk0RDt9Cgkuc3Qxe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6I0QxOEVFMjt9Cgkuc3Qye2ZpbGw6I0ZGNzc1OTt9CiA8L3N0eWxlPgogPG1ldGFkYXRhPgogIDxzZncgeG1sbnM9Im5zX3NmdzsiPgogICA8c2xpY2VzPgogICA8L3NsaWNlcz4KICAgPHNsaWNlU291cmNlQm91bmRzIGJvdHRvbUxlZnRPcmlnaW49InRydWUiIGhlaWdodD0iNzUiIHdpZHRoPSI3NSIgeD0iLTM0Ny42IiB5PSIwLjUiPgogICA8L3NsaWNlU291cmNlQm91bmRzPgogIDwvc2Z3PgogPC9tZXRhZGF0YT4KIDxnPgogIDxnPgogICA8Zz4KICAgIDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNC4zLDQ0LjdjMiwwLDYtMC4xLDExLjYtMi40YzYuNS0yLjcsMTkuMy03LjUsMjguNi0xMi41YzYuNS0zLjUsOS4zLTguMSw5LjMtMTQuM0M3My44LDcsNjYuOSwwLDU4LjMsMAoJCQkJaC0zNkMxMCwwLDAsMTAsMCwyMi4zUzkuNCw0NC43LDI0LjMsNDQuN3oiPgogICAgPC9wYXRoPgogICAgPHBhdGggY2xhc3M9InN0MSIgZD0iTTMwLjQsNjBjMC02LDMuNi0xMS41LDkuMi0xMy44bDExLjMtNC43QzYyLjQsMzYuOCw3NSw0NS4yLDc1LDU3LjZDNzUsNjcuMiw2Ny4yLDc1LDU3LjYsNzVsLTEyLjMsMAoJCQkJQzM3LjEsNzUsMzAuNCw2OC4zLDMwLjQsNjB6Ij4KICAgIDwvcGF0aD4KICAgIDxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMi45LDQ3LjZMMTIuOSw0Ny42QzUuOCw0Ny42LDAsNTMuNCwwLDYwLjV2MS43QzAsNjkuMiw1LjgsNzUsMTIuOSw3NWgwYzcuMSwwLDEyLjktNS44LDEyLjktMTIuOXYtMS43CgkJCQlDMjUuNyw1My40LDIwLDQ3LjYsMTIuOSw0Ny42eiI+CiAgICA8L3BhdGg+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPg==&style=for-the-badge&logoSize=auto
[Cohere-url]: https://cohere.com/
[S3]: https://img.shields.io/badge/s3-3f3f46?logo=data:image/svg%2bxml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHJlY3QgZmlsbD0iI2ZmZiIgaGVpZ2h0PSI1MTIiIHJ4PSIxNSUiIHdpZHRoPSI1MTIiLz48cGF0aCBkPSJtMjU5LjcgMzQ4LjItMTM3IDMyLjd2LTI1MC4zbDEzNyAzMnoiIGZpbGw9IiNlMDUyNDMiLz48cGF0aCBkPSJtMjU2IDM0OC42IDEzMy4zIDMyLjMuMS0uM3YtMjQ5LjZsLS4xLS4zLTEzMy4zIDMyLjN2MTg1LjciIGZpbGw9IiM4YzMxMjMiLz48ZyBmaWxsPSIjZTA1MjQzIj48cGF0aCBpZD0iYSIgZD0ibTI1NiA2NHY5Ni44bDU4IDE0LjR2LTgyLjJ6bTEzMy4zIDY2LjZ2MjUwLjNsMjUuNi0xMi44di0yMjQuN3ptLTEzMy4zIDc3LjF2OTdsNTgtNy41di04Mi4yem01OCAxMjkuMS01OCAxNC40djk2LjhsNTgtMjl6Ii8+PC9nPjx1c2UgZmlsbD0iIzhjMzEyMyIgdHJhbnNmb3JtPSJtYXRyaXgoLTEgMCAwIC0xIDUxMiA1MTIpIiB4bGluazpocmVmPSIjYSIvPjxwYXRoIGQ9Im0zMTQgMTc1LjItNTggMTAuNy01OC0xMC43IDU3LjktMTUuMSA1OC4zIDE1LjEiIGZpbGw9IiM1ZTFmMTgiLz48cGF0aCBkPSJtMzE0IDMzNi44LTU4LTEwLjctNTggMTAuNyA1Ny45IDE2LjEgNTguMy0xNi4xIiBmaWxsPSIjZjJiMGE5Ii8+PC9zdmc+&style=for-the-badge&logoSize=auto
[S3-url]: https://aws.amazon.com/s3/
[Voyage]: https://img.shields.io/badge/voyage-F2FBEF?logo=data:image/svg%2bxml;base64,PHN2ZyBoZWlnaHQ9IjFlbSIgc3R5bGU9ImZsZXg6bm9uZTtsaW5lLWhlaWdodDoxIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPlZveWFnZTwvdGl0bGU+PHBhdGggZD0iTTUuNDA3IDB2LjA2NmEuOTc0Ljk3NCAwIDAwLS4wNDguMjQ1Yy0uMDExLjExLS4wMTYuMjA4LS4wMTYuMjk1IDAgLjMzOS4wNDMuNzE1LjEyOCAxLjEzLjA5Ny40MDUuMjc0LjkxMi41MzEgMS41MjRsNy4xMjUgMTYuMzY2TDIwLjAxMSAzLjM5Yy4xNjEtLjQwNC4zMzMtLjg0Ni41MTUtMS4zMjcuMTgyLS40OC4yNzMtLjk2Ni4yNzMtMS40NThhMS40MDYgMS40MDYgMCAwMC0uMDk2LS41NFYwSDI0di4wNjZjLS4yMDQuMjA3LS40NS41NzgtLjc0IDEuMTE0LS4yOS41MzUtLjYwNiAxLjE5NS0uOTQ5IDEuOTgyTDEzLjA5NSAyNGgtMS4yODdMMy4wNzUgMy45NjVjLS4yMDQtLjQ3LS40MTgtLjkyMy0uNjQ0LTEuMzYtLjIxNC0uNDM3LS40MTgtLjgzLS42MS0xLjE4LS4xOTQtLjM2LS4zNjUtLjY2LS41MTUtLjlBNS42NjYgNS42NjYgMCAwMDEgLjA2NFYwaDQuNDA3eiIgZmlsbD0iIzAxMkUzMyI+PC9wYXRoPjwvc3ZnPg==&style=for-the-badge&logoSize=auto
[Voyage-url]: https://www.voyageai.com/
[Pinecone]: https://img.shields.io/badge/pinecone-ffffff?logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMTMuNzgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjU2IDI4OCI+PHBhdGggZmlsbD0iIzIwMUQxRSIgZD0iTTEwOC42MzQgMjU0LjQzNmM5LjA4IDAgMTYuNDQgNy4zNjEgMTYuNDQgMTYuNDQycy03LjM2IDE2LjQ0LTE2LjQ0IDE2LjQ0cy0xNi40NDItNy4zNi0xNi40NDItMTYuNDRzNy4zNjEtMTYuNDQyIDE2LjQ0Mi0xNi40NDJtOTEuMjE2LTI5Ljk5OGwxNi4yNDcgNC44MTRMMjAzLjIgMjcyLjc4YTguNDcgOC40NyAwIDAgMS04LjcgNi4wNDZsLTMuOTgzLS4yNzNsLS4wOTguMDhsLTQxLjM5LTIuOTA0bDEuMTUyLTE2LjkwNmwyNy44MDggMS44ODdsLTE4LjIwNS0yNi4yNjJsMTMuOTI2LTkuNjU2bDE4LjIyOSAyNi4yOTV6bS0xNzYuODM3LTMwLjA5bDE2LjkwMyAxLjE5N2wtMS45OCAyNy44MDRMNjQuMTUgMjA1LjEybDkuNjc3IDEzLjkxbC0yNi4yNDggMTguMjQ4bDI2Ljc5MiA3Ljg5NWwtNC43OSAxNi4yNTVsLTQzLjczMi0xMi44ODVhOC40NyA4LjQ3IDAgMCAxLTYuMDU4LTguNzI2ek0xMzIuMTUgMTcwLjY3bDMwLjUwOCAzNi44MzJsLTEzLjc1IDExLjM4OWwtMTguMTU2LTIxLjkybC01Ljg4NiAzMy43MDJsLTE3LjU4Ny0zLjA3NGw1Ljg5Mi0zMy43NTVsLTI0LjQ0MiAxNC40MTJsLTkuMDYzLTE1LjM4M2w0MS4wNzktMjQuMmE4LjkzIDguOTMgMCAwIDEgMTEuNDA1IDEuOTk3bTg1LjM1NC0yNC43MWwxNS4yMzktOC4yOTJsMjIuMiA0MC44MDVhOC42NzUgOC42NzUgMCAwIDEtMS45MjYgMTAuNjlsLTMuMTQxIDIuNzE0bC0zMi4wNSAyNy44OTNsLTExLjM4Ni0xMy4wOWwyMS41NDgtMTguNzQ3bC0zMi4wOTUtNS43ODFsMy4wNzgtMTcuMDc0bDMyLjA3MyA1Ljc3OXpNMzcuNzgyIDEwMy4yOThsMTEuNDggMTMuMDA4bC0yMS4yNTEgMTguNzQzbDMyLjE1NiA1LjYxNGwtMi45OCAxNy4wOTFsLTMyLjE5Mi01LjYxOGwxMy44MjcgMjQuOTk4bC0xNS4xOCA4LjM5OGwtMjIuNTU4LTQwLjc3NmE4LjY3NSA4LjY3NSAwIDAgMSAxLjg1LTEwLjcwM3ptMTA4LjY5NC0xMy40MmwzMC40MDQgMzYuNzM0bC0xMy43NTMgMTEuMzg0bC0xOC4xNTItMjEuOTNsLTUuODg2IDMzLjcxMmwtMTcuNTg3LTMuMDc0bDUuODcyLTMzLjYyNGwtMjQuMzQ5IDE0LjI3NGwtOS4wMjctMTUuNDAzbDM3LjQtMjEuOTI5bC4wMzgtLjE0MmwuMTY1LjAyMWwzLjQ4NS0yLjAzMmE4LjkzIDguOTMgMCAwIDEgMTEuMzkgMi4wMW0zOS4xOC0xOC4wNjVsNi42NS0xNi4wMjRsNDMuMDEyIDE3Ljg1YTguNjc1IDguNjc1IDAgMCAxIDUuMjE4IDkuNTE3bC0uNzE2IDMuOTgybC03LjM0NSA0MS43OGwtMTcuMDg2LTMuMDFsNC45MjQtMjcuOTY4bC0yOC41MzcgMTUuNzcybC04LjM4Ni0xNS4xODhsMjguNTkxLTE1Ljc4NHptLTgxLjkzOS0zMS41NzdsLjc0IDE3LjMzNGwtMjguNDE0IDEuMjE0bDIxLjQzIDI0LjQ5bC0xMy4wNTYgMTEuNDI0TDYyLjk1IDcwLjE3M2wtNS4wMDEgMjhsLTE3LjA3OC0zLjA1NGw4LjE4NC00NS43NTlhOC42NzQgOC42NzQgMCAwIDEgOC4xNy03LjEzOWw0LjAyLS4xOGwuMDktLjA2NXptNTguMTIxLTM2Ljk2NWwzMC4yNjcgMzYuOTY1bC0xMy44MTQgMTEuMzFsLTE3Ljk2NC0yMS45NDNsLTYuMDU5IDMzLjY2OGwtMTcuNTctMy4xNjJsNi4wNjgtMzMuNzQzbC0yNC41MjYgMTQuMzRsLTkuMDA3LTE1LjQxNUwxNTAuNDI4IDEuMjJhOC45MyA4LjkzIDAgMCAxIDExLjQxIDIuMDUyIi8+PC9zdmc+&style=for-the-badge&logoSize=auto
[Pinecone-url]: https://www.pinecone.io/
[UploadThings]: https://img.shields.io/badge/UploadThings-dc2626?style=for-the-badge&logoSize=auto
[UploadThings-url]: https://uploadthing.com/

