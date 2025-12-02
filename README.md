# Decider-T: Laptop Recommendation System (TOPSIS)

**Decider-T** is a smart Decision Support System (SPK) designed to help university students choose the ideal laptop based on their specific major requirements. It utilizes the **TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution)** method to rank laptops objectively.

**Live Demo:** [https://MuhammadPrayoga.github.io/Decider-T](https://MuhammadPrayoga.github.io/Decider-T)

## 🚀 Features

### 🎓 User Mode

- **Personalized Recommendations**: Input your name and select your major.
- **Major-Specific Weighting**: The system automatically adjusts criteria weights (Price, CPU, RAM, Storage, VRAM) based on the selected major's needs.
  - _Informatika_: Balanced high specs.
  - _DKV_: High VRAM & RAM focus.
  - _Bisnis_: Storage & Price focus.
  - _Sastra_: Price focus (Budget-friendly).
  - _Arsitektur_: CPU & RAM focus.
  - _Akuntansi_: Balanced Office focus.
  - _Hukum_: Text/Storage focus.
  - _Kedokteran_: Balanced/Storage focus.
- **Visual Rankings**: See the top recommended laptop with a detailed breakdown of specifications and preference scores.
- **Detail View**: Click on any laptop card to view full specifications in a modal.
- **Dark/Light Mode**: Toggle between a clean light theme and a sleek dark theme.

### 🛠️ Admin Mode

- **Secure Access**: Simple password-protected admin area.
- **Manage Laptop Data**: Add, Edit, and Delete laptops from the database.
- **Image Support**: Add image URLs to display product photos.
- **Data Persistence**: All changes are saved locally in your browser.

### 🧠 TOPSIS Calculation Details

- **Debug View**: Users can view the step-by-step calculation process:
  1.  **Crisp Conversion**: Converting raw specs to a 1-5 scale.
  2.  **Normalization**: Creating the normalized decision matrix (R).
  3.  **Weighted Normalization**: Applying major-specific weights (Y).
  4.  **Ideal Solutions**: Determining Positive (A+) and Negative (A-) ideal solutions.
  5.  **Preference Calculation**: Calculating distances and final preference values (V).

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Architecture**: Component-based structure with separated Logic (`utils`), Data (`data`), and UI (`components`).

## 📦 Installation & Run

1.  **Clone the repository**
    ```bash
    git clone https://github.com/MuhammadPrayoga/Decider-T.git
    cd Decider-T
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  Open your browser at `http://localhost:5173` (or the URL shown in the terminal).

## 📝 License

This project is created for educational purposes.
