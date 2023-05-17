import * as Avatar from '@radix-ui/react-avatar';

export default function Review (props) {
    return (
        <div style={{backgroundColor: "aliceblue", borderRadius: "50px", display: "inline-block", marginBottom: "20px"}}>
                <Avatar.Root className="AvatarRoot" style={{borderRadius: "20px"}}>
                    <Avatar.Image 
                        className="AvatarImage"
                        src={props.picture}/>
                    <Avatar.Fallback />
                </Avatar.Root>
                <h3 style={{marginTop: "0px"}}>{props.name}</h3>
                <div style={{width: "90%", left: "5%", position:"relative"}}>
                    <p style={{textAlign: "left"}}>{props.text}</p>
                </div>
                
        </div>
    );
}