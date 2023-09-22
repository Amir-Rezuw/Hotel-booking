import Maps from "../Components/Maps/Maps";

const Bookmarks = () => {
  return (
    <div className="appLayout">
      <div className="sidebar">Bookmarks List</div>
      <Maps markedLocations={[]} />
    </div>
  );
};

export default Bookmarks;
