# DevBack - uOttaHack 2025 "Best Use of Starknet" challenge

DevBack is a website designed to bridge the gap between open-source contributors and the community that benefits from their work. By pulling data from GitHub, DevBack allows users to:

- View the top contributors of their favorite open-source libraries and projects.
- Donate cryptocurrency (Starknet coin) directly to the open-source developers they admire and support.

We believe this initiative is crucial to addressing the decline in open-source development and revitalizing this vital part of the software community. By enabling contributions and recognizing the hard work of developers, we aim to foster a thriving ecosystem of innovation and collaboration.

---

## Features

1. **GitHub Integration**

   - Fetches real-time data about contributors for any GitHub repository.
   - Displays the top contributors for each GitHub repository.

2. **Cryptocurrency Donations**

   - Supports blockchain-based donations using Starknet coin.
   - Provides a secure and efficient way to fund open-source developers.

3. **User-Friendly Interface**

   - Simple and intuitive design for seamless navigation.
   - Search functionality to quickly find repositories and contributors.

4. **Community Impact**

   - Encourages a culture of giving back to open-source projects.
   - Highlights the importance of maintaining a vibrant and sustainable software ecosystem.

---

## Why DevBack Matters

Open-source software powers a significant portion of the technology we use daily. However, many developers contribute their time and expertise without adequate recognition or compensation. This has led to a decline in open-source contributions, threatening the innovation and accessibility that define our software community.

DevBack is our way of giving back to the developers who make this ecosystem possible. By connecting users with contributors and facilitating direct donations, we hope to:

- Support developers financially to continue their invaluable work.
- Promote awareness of the importance of open-source contributions.
- Build a more collaborative and sustainable software community.

---

## Getting Started

### Prerequisites

- A GitHub account.
- A Starknet wallet to facilitate cryptocurrency donations.
- Basic familiarity with open-source repositories.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/peter-bf/devback
   ```

2. Navigate to the frontend directory:

   ```bash
   cd devback
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```
   If any errors occur, do
   ```bash
   npm install --legacy-peer-deps
   ```

4. Start the server on local host port:3000

```bash
npm run dev
```

5. Navigate into backend directory

   ```bash
   cd ../backend
   ```

6. Run backend on local machine

   ```bash
   uvicorn app.main:app
   ```

7. Open your browser and visit:

   ```
   http://localhost:3000
   ```

---

## Usage

1. Enter the name of a GitHub repository to view its top contributors.
2. Browse through the contributors and their activity statistics.
3. Select a contributor and initiate a donation using Starknet coin.

---

## Contributing

We welcome contributions to DevBack! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push your changes:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request on the main repository.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Inspired by the open-source community and the developers who make it thrive.

---

Let’s keep the spirit of open-source alive!
