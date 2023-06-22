import * as Avatar from '@radix-ui/react-avatar';

const ReviewCard = ({picture, name, text, rating}) => {
    return (
        <div style={{backgroundColor: "aliceblue", borderRadius: "50px", display: "inline-block", marginBottom: "20px"}}>
                <Avatar.Root className="AvatarRoot" style={{borderRadius: "20px"}}>
                    <Avatar.Image 
                        className="AvatarImage"
                        src={picture}/>
                    <Avatar.Fallback />
                </Avatar.Root>
                <h3 style={{marginTop: "0px"}}>{name}</h3>
                <div style={{width: "90%", left: "5%", position:"relative"}}>
                    <p> rating {rating} stars</p>
                    <p style={{textAlign: "left"}}>{text}</p>
                </div>
                
        </div>
    );
}

export default ReviewCard