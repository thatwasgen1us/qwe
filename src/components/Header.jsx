import { useEffect } from "react";
import { createGuestSession } from "../store/store";
import RadioButtons from "./RadioButtons";

const Header = ({ setSearch, onSearch, onRated, rated }) => {

  useEffect(() => {
    const initializeGuestSession = async () => {
      await createGuestSession();
    };

    initializeGuestSession();
  }, []);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <header className='flex flex-col items-center justify-center mx-0 my-auto'>
      <RadioButtons onSearch={onSearch} onRated={onRated} />
      {!rated && (
        <input
          type="text"
          className='w-full border border-[#D9D9D9] px-3 py-2 text-base'
          placeholder='Type to search...'
          onChange={handleInputChange} // Используйте onChange вместо onKeyDown
        />
      )}
    </header>
  );
}

export default Header;
