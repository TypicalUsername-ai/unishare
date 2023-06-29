import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';
import report from '../../functions/report';
import { useState } from 'react';

function ReportButton (id, token) { 

  const [option, setOption] = useState("");
 
  const handleOption = (event) => {
    setOption(event.target.value);
    } 

  return( 
  <Popover.Root>
    <Popover.Trigger asChild>
      <button className='seeMore' aria-label="Update dimensions">
    
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content sideOffset={5}>
        <div style={{ display: 'flex', backgroundColor:"white", flexDirection: 'column', gap: 10 }}>
          <p style={{ marginBottom: 10 }}>
        
          </p>
          <fieldset >
            <label htmlFor="width" style={{position:"relative", bottom:"40%", padding:"10px"}}>
              Message
            </label>
            <textarea></textarea>
          </fieldset>
          <fieldset>
            <label>Tag</label>
            <select name="report" onClick={handleOption}>
                    <option value="file-id">Inapropriate Language</option>
                    <option value="bullying">Bullying</option>
                    <option value="photos">Inapropriate Photos</option>
                    <option value="other">Other</option>
                    
                </select>
          </fieldset>
          <fieldset>
            <button onClick={() => report({id, object_type, option}, token)}>Report User</button>
          </fieldset>
        </div>
        <Popover.Close className="PopoverClose" aria-label="Close">
          <Cross2Icon />
        </Popover.Close>
        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
  );
};

export default ReportButton;