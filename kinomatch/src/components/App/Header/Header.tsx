import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import './Header.scss';

function Header() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  function handleClick() {
    setShowBurgerMenu(!showBurgerMenu);
  }

  return (
    <div className='Header'>
      {/* Logo du Header */}
      <Link key='home' to='/' className='Header-logo'>
        <img className='Header-logo__image' src='./images/kino_match_logo.png' alt='logo' />
      </Link>
      {/* Bouton qui au clic amènera une recommandation de film aléatoire */}
      <button className='Header-random-button'>
        <i className='fa-solid fa-dice'></i>
        ALEATOIRE
      </button>
      {/* Bouton, lorsque l'utilisateur n'est pas connecté, l'app affichera ce bouton 'SE CONNECTER' */}
      {/* Au clic sera affichée une modale BurgerMenu */}
      {!isLoggedIn && (
        <div className='Header-buttons'>
          <button className='Header-buttons-button'>
            <Link key='signin' to='/signin'>
              SE CONNECTER
            </Link>
          </button>
          <button className='Header-buttons-button'>
            <Link key='create-profile' to='/create-profile'>
              CRÉER UN COMPTE
            </Link>
          </button>
        </div>
      )}
      {/* Icône BurgerMenu */}
      <div onClick={handleClick} className={`menu-icon ${showBurgerMenu && 'active'}`}>
        <div className='line-1'></div>
        <div className='line-2'></div>
        <div className='line-3'></div>
      </div>
      {/* Pour activer la modale selon le state showBurgerMenu */}
      {showBurgerMenu && <BurgerMenu showBurgerMenu={showBurgerMenu} setShowBurgerMenu={setShowBurgerMenu} />}
    </div>
  );
}

export default Header;
