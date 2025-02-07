import { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";

const Navbar = ({ toggleTheme, theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`p-4 shadow-md transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="container mx-auto flex justify-between items-center relative">
        <Link to="/" className="text-xl font-bold">
          📖 Dictionary App
        </Link>

        {/* Кнопка бургера */}
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu size={24} className={`${theme === "dark" ? "text-white" : "text-gray-900"}`} />
        </button>

        {/* Основное меню (для больших экранов) */}
        <ul className="hidden md:flex md:items-center space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-500 transition-colors duration-200">
              Главная
            </Link>
          </li>
          <li>
            <Link to="/dictionary" className="hover:text-blue-500 transition-colors duration-200">
              Словарь
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="hover:text-blue-500 transition-colors duration-200">
              Избранное
            </Link>
          </li>
          {/* <li>
  <Link to="/flashcards" className="hover:text-blue-500 dark:hover:text-blue-300">
    Карточки
  </Link>
</li> */}
          <li>
            <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </li>
        </ul>
      </div>

      {/* Боковое меню для мобильных устройств */}
      <div className={`fixed top-0 right-0 h-full w-64 shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 md:hidden ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} z-20`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col items-center space-y-6 mt-4">
          <li>
            <Link to="/" className="hover:text-blue-500 transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Главная
            </Link>
          </li>
          <li>
            <Link to="/dictionary" className="hover:text-blue-500 transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Словарь
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="hover:text-blue-500 transition-colors duration-200" onClick={() => setIsOpen(false)}>
              Избранное
            </Link>
          </li>
          {/* <li>
  <Link to="/flashcards" className="hover:text-blue-500 dark:hover:text-blue-300">
    Карточки
  </Link>
</li> */}
          <li>
            <button onClick={() => { toggleTheme(); setIsOpen(false); }} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;