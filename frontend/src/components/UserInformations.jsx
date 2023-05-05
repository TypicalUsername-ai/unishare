import * as Avatar from '@radix-ui/react-avatar';

export default function UserInformations () {
    return (
        <div className='GlobalContainer'>
            <section style={{display: "flex", verticalAlign: "middle"}}>
                <Avatar.Root className="AvatarRoot">
                    <Avatar.Image 
                        className="AvatarImage"
                        src="https://static2.strzelce360.pl/data/articles/xl-ernest-khalimov-czy-istnieje-kto-to-wiek-wzrost-waga-wikipedia-1669905523-full.jpg"/>
                    <Avatar.Fallback />
                </Avatar.Root>
                <h1 style={{marginLeft: "20px", position: "relative", bottom: "15px"}}>Unishare</h1>
            </section>
            <section style={{backgroundColor: "#59c0cf"}}>
                <h2>Information</h2>
                <div style={{display: "flex", verticalAlign: "middle"}}>
                    <h3 style={{marginBottom: "0px", marginLeft: "20px"}}>Name:&nbsp;&nbsp;</h3>
                    <h3>Ernest</h3>
                </div>

                <div style={{display: "flex", verticalAlign: "middle"}}>
                    <h3 style={{marginTop: "0px", marginLeft: "20px"}}>Surname:&nbsp;&nbsp;</h3>
                    <h3 style={{marginTop: "0px"}}>Strychalski</h3>
                </div>
            </section>
              

        </div>
    );
}