import File from "../FileCard";

function UserFilesContainer () {
    return (
        <div style={{backgroundColor: "AliceBlue"}}>
            <h2>Latest files</h2>
            <File 
                title="Mateusz notes" 
                picture="https://static2.strzelce360.pl/data/articles/xl-ernest-khalimov-czy-istnieje-kto-to-wiek-wzrost-waga-wikipedia-1669905523-full.jpg"/>
            <File 
                title="NanoTechnology"
                picture="https://static2.strzelce360.pl/data/articles/xl-ernest-khalimov-czy-istnieje-kto-to-wiek-wzrost-waga-wikipedia-1669905523-full.jpg"/>
            <File 
                title="Abstract Algebra"
                picture="https://static2.strzelce360.pl/data/articles/xl-ernest-khalimov-czy-istnieje-kto-to-wiek-wzrost-waga-wikipedia-1669905523-full.jpg"/>

            <button className="seeMore" style={{backgroundColor: "#4CA1AF", marginBottom: "20px"}}>See more</button>
        </div>
    );
}

export default UserFilesContainer