import * as Avatar from '@radix-ui/react-avatar';

export default function File (props) {
    return (
        <div style={{display: "flex", backgroundColor: "#4CA1AF", borderRadius: "45px", marginBottom: "20px"}} >
            <Avatar.Root className="AvatarRoot" style={{borderRadius: "20px"}}>
                    <Avatar.Image 
                        className="AvatarImage"
                        src={props.picture}/>
                    <Avatar.Fallback />
                </Avatar.Root>
                <section style={{textAlign: "left"}}>
                    <h3 style={{marginBottom: "8px"}}>{props.title}</h3>
                    <button className='seeMore'>Details</button>
                </section>
            
        </div>
    );
} 