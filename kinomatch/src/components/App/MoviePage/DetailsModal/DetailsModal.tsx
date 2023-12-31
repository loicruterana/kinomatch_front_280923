import { Key, ReactNode } from 'react';
import './DetailsModal.scss';

// Création de l'interface pour Typescript
interface DetailsModalProps {
  showDetailsModal: boolean;
  setShowDetailsModal: (showDetailsModal: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  movie: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  credits: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  directingCrewMembers: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatDate: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  convertMinutesInHours: (showDetailsModal: any) => ReactNode;
}

// Fonction permettant de cacher la modale DetailsModal
function DetailsModal(props: DetailsModalProps) {
  const {
    showDetailsModal,
    setShowDetailsModal,
    movie,
    credits,
    directingCrewMembers,
    formatDate,
    convertMinutesInHours,
  } = props;

  // Fonction permettant de manipuler la modale. Au clique ==> passe de true à false et inversement
  const handleDetailsModel = () => {
    setShowDetailsModal(!showDetailsModal);
  };

  // Fonction permettant de générer un nombre aléatoire pour les key unique des Sociétés de production
  function getRandomNumber() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const index = Math.floor(Math.random() * numbers.length);
    const number = numbers[index];
    numbers.splice(index, 1);
    return number;
  }

  // Fonctions permettant de trouver des personnes suivant leur job

  const writingCrewMembers = credits.crew.filter(
    (person: { job: string }) =>
      person.job === 'Writer' || person.job === 'Screenplay'
  );
  const musicCrewMembers = credits.crew.filter(
    (person: { job: string }) =>
      person.job === 'Music' || person.job === 'Original Music Composer'
  );
  const costumeCrewMembers = credits.crew.filter(
    (person: { job: string }) => person.job === 'Costume Design'
  );
  const photographyCrewMembers = credits.crew.filter(
    (person: { job: string }) => person.job === 'Director of Photography'
  );
  const artCrewMembers = credits.crew.filter(
    (person: { job: string }) => person.job === 'Art Direction'
  );
  const designerCrewMembers = credits.crew.filter(
    (person: { job: string }) => person.job === 'Production Design'
  );

  return (
    <article className='detailsModal__container'>
      <section className='detailsModal__container-image'>
        <h3 className='detailsModal__container-originalTitle'>
          Titre original
        </h3>
        <p className='detailsModal__container-originalTitleName'>
          {movie.original_title}
        </p>
        <div className='detailsModal__container-image--container'>
          {/* Afficher l'image du film si il y en a une, sinon une affiche par défaut*/}
          <img
            className='detailsModal__container-image--container--movie'
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                : '/images/SamplePoster1.png'
            }
            alt={`Affiche du film: ${movie.title}`}
          />
          {/* Afficher la page officielle du film si il y en a une, sinon rien */}
          {movie.homepage && (
            <a
              className='detailsModal__container-image--container--link'
              href={movie.homepage}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Page officielle du film: ${movie.title}`}
            >
              Page du film
            </a>
          )}
        </div>
      </section>
      <section className='detailsModal__container-details'>
        <div className='detailsModal__container-details--principal'>
          {/* Adapte le mot "réalisateur" suivant la pluralité */}
          <h3 className='detailsModal__container-director'>
            {directingCrewMembers.length > 1 ? 'Réalisateurs' : 'Réalisateur'}
          </h3>
          <ul className='detailsModal__container-directorList'>
            {/* Si il n'y a pas de réalisateur, afficher un tiret, sinon afficher la liste des réalisateurs */}
            {directingCrewMembers.length === 0 ? (
              <li>-</li>
            ) : (
              directingCrewMembers.map(
                (director: { id: Key | null | undefined; name: string }) => (
                  <li
                    key={director.id}
                    className='detailsModal__container-directorName'
                  >
                    {director.name}
                  </li>
                )
              )
            )}
          </ul>
          <h3 className='detailsModal__container-screenwriter'>Scénariste</h3>
          <ul className='detailsModal__container-screenwriterList'>
            {/* Si il n'y a pas de scénariste, afficher un tiret, sinon afficher la liste des scénaristes */}
            {writingCrewMembers.length === 0 ? (
              <li>-</li>
            ) : (
              writingCrewMembers.map(
                (writer: { id: Key | null | undefined; name: string }) => (
                  <li
                    key={writer.id}
                    className='detailsModal__container-screenwriterName'
                  >
                    {writer.name}
                  </li>
                )
              )
            )}
          </ul>
          <h3 className='detailsModal__container-producers'>
            Sociétés de production
          </h3>
          <ul className='detailsModal__container-producers-list'>
            {/* Si il n'y a pas de société de production, afficher un tiret, sinon afficher la liste des sociétés de production */}
            {movie.production_companies.length === 0 ? (
              <li>-</li>
            ) : (
              movie.production_companies.map(
                (production_company: {
                  key: Key | number | undefined;
                  name: string;
                }) => (
                  <li
                    key={getRandomNumber()}
                    className='detailsModal__container-producers-list-name'
                  >
                    {production_company.name}
                  </li>
                )
              )
            )}
          </ul>
          <h3 className='detailsModal__container-productionCountry'>
            Pays de production
          </h3>
          <ul className='detailsModal__container-productionCountry-list'>
            {/* Si il n'y a pas de pays de production, afficher un tiret, sinon afficher la liste des pays de production */}
            {movie.production_countries.length === 0 ? (
              <li>-</li>
            ) : (
              movie.production_countries.map(
                (production_country: {
                  iso_3166_1: Key | null | undefined;
                  name: string;
                }) => (
                  <li
                    key={production_country.iso_3166_1}
                    className='detailsModal__container-productionCountry-list-country'
                  >
                    {production_country.name}
                  </li>
                )
              )
            )}
          </ul>
          <h3 className='detailsModal__container-budget'>Budget</h3>
          {/* Si il n'y a pas de budget, afficher un tiret, sinon afficher le budget */}
          <p className='detailsModal__container-budgetAmount'>
            {movie.budget !== 0 ? `${movie.budget} $` : 'Budget non précisé'}
          </p>

          <h3 className='detailsModal__container-revenue'>Recettes</h3>
          {/* Si il n'y a pas de recettes, afficher un tiret, sinon afficher les recettes */}
          <p className='detailsModal__container-revenueAmount'>
            {movie.revenue !== 0
              ? `${movie.revenue} $`
              : 'Recettes non précisées'}
          </p>

          <h3 className='detailsModal__container-duration'>Durée</h3>
          {/* Affiche la durée du film convertie en heures et minutes */}
          <p className='detailsModal__container-durationTime'>
            {convertMinutesInHours(movie.runtime)}
          </p>

          <h3 className='detailsModal__container-date'>Date de sortie</h3>
          {/* Affiche la date de sortie du film au format jj/mm/aaaa */}
          <p className='detailsModal__container-dateName'>
            {formatDate(movie.release_date)}
          </p>
        </div>
        <div className='detailsModal__container-details--secondary'>
          <h3 className='detailsModal__container-composer'>Musique</h3>
          {/* Si il n'y a pas de compositeur, afficher un tiret, sinon afficher la liste des compositeurs */}
          <ul className='detailsModal__container-composerList'>
            {musicCrewMembers.length === 0 ? (
              <li>-</li>
            ) : (
              musicCrewMembers.map(
                (composer: { id: Key | null | undefined; name: string }) => (
                  <li
                    key={composer.id}
                    className='detailsModal__container-composerName'
                  >
                    {composer.name}
                  </li>
                )
              )
            )}
          </ul>
          <h3 className='detailsModal__container-artisticDirection'>
            Direction artistique
          </h3>
          {/* Si il n'y a pas de directeur artistique, afficher un tiret, sinon afficher la liste des directeurs artistiques */}
          <ul className='detailsModal__container-artistsList'>
            {artCrewMembers.length === 0 ? (
              <li>-</li>
            ) : (
              artCrewMembers.map(
                (artist: { id: Key | null | undefined; name: string }) => (
                  <li
                    key={artist.id}
                    className='detailsModal__container-artists'
                  >
                    {artist.name}
                  </li>
                )
              )
            )}
          </ul>
          <h3 className='detailsModal__container-productionDesigner'>Décors</h3>
          {/* Si il n'y a pas de décorateur, afficher un tiret, sinon afficher la liste des décorateurs */}
          <ul className='detailsModal__container-productionDesignerList'>
            {designerCrewMembers.length === 0 ? (
              <li>-</li>
            ) : (
              designerCrewMembers.map(
                (designer: { id: Key | null | undefined; name: string }) => (
                  <li
                    key={designer.id}
                    className='detailsModal__container-designers'
                  >
                    {designer.name}
                  </li>
                )
              )
            )}
          </ul>
          <h3 className='detailsModal__container-costuming'>Costumes</h3>
          {/* Si il n'y a pas de costumier, afficher un tiret, sinon afficher la liste des costumiers */}
          <ul className='detailsModal__container-costumingList'>
            {costumeCrewMembers.length === 0 ? (
              <li>-</li>
            ) : (
              costumeCrewMembers.map(
                (costumeDesigner: {
                  id: Key | null | undefined;
                  name: string;
                }) => (
                  <li
                    key={costumeCrewMembers.id}
                    className='detailsModal__container-costumeDesigner'
                  >
                    {costumeDesigner.name}
                  </li>
                )
              )
            )}
          </ul>
          <h3 className='detailsModal__container-photography'>Photographie</h3>
          {/* Si il n'y a pas de photographe, afficher un tiret, sinon afficher la liste des photographes */}
          <ul className='detailsModal__container-photographyList'>
            {photographyCrewMembers.length === 0 ? (
              <li>-</li>
            ) : (
              photographyCrewMembers.map(
                (photographer: {
                  id: Key | null | undefined;
                  name: string;
                }) => (
                  <li
                    key={photographer.id}
                    className='detailsModal__container-photographer'
                  >
                    {photographer.name}
                  </li>
                )
              )
            )}
          </ul>

          <h3 className='detailsModal__container-genreTitle'>Genres</h3>
          {/* Si il n'y a pas de genre, afficher un tiret, sinon afficher la liste des genres */}
          <ul className='detailsModal__container-genreList'>
            {movie.genres.length === 0 ? (
              <li>-</li>
            ) : (
              movie.genres.map(
                (genre: { id: Key | null | undefined; name: string }) => (
                  <li key={genre.id} className='detailsModal__container-genre'>
                    {genre.name}
                  </li>
                )
              )
            )}
          </ul>
        </div>
      </section>

      {/* Si il n'y a pas de casting, ne rien afficher, sinon afficher la liste des acteurs */}
      {credits.cast.length === 0 ? null : (
        <section className='detailsModal__container-distributionList'>
          <div className='detailsModal__container-distribution'>
            <h3 className='detailsModal__container-distribution-title'>
              Distribution
            </h3>
            {/* Affiche la liste des acteurs avec leur nom, leur photo et leur rôle */}
            <ul className='detailsModal__container-actorsList'>
              {credits.cast.map(
                (actor: {
                  id: Key | null | undefined;
                  name: string;
                  profile_path: string;
                  character: string;
                }) => (
                  <li key={actor.id} className='detailsModal__container-actor'>
                    <h4 className='detailsModal__container-actor--title'>
                      {actor.name}
                    </h4>
                    <img
                      className='detailsModal__container-actor--image'
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/original/t/p/w138_and_h175_face/${actor.profile_path}`
                          : '/images/SamplePic.png'
                      }
                      alt={`Photo de ${actor.name}`}
                    />
                    <p className='detailsModal__container-actor--role'>
                      {actor.character}
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>
        </section>
      )}

      <div className='detailsModal__container-button'>
        {/* Bouton pour fermer la modal */}
        <button
          className='detailsModal__container-button--btn'
          onClick={handleDetailsModel}
          aria-label='Fermer la fenêtre modale'
        >
          Retour
        </button>
        {/* Si il n'y a pas de page du film, ne rien afficher, sinon afficher le lien vers la page du film dans un nouvel onglet */}
        {movie.homepage && (
          <a
            className='detailsModal__container-button--link'
            href={movie.homepage}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Page officielle du film: ${movie.title}`}
          >
            Page du film
          </a>
        )}
      </div>
    </article>
  );
}

export default DetailsModal;
