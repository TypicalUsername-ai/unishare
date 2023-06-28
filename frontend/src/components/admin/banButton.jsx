import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';

import banUser from '../../functions/banUser';
import DeleteUserButton from '../User/DeleteUserButton';




const banButton = (props) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button className='seeMore' aria-label="Update dimensions">
        Ban User
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content sideOffset={5}>
        <div style={{ display: 'flex', backgroundColor:"white", flexDirection: 'column', gap: 10 }}>
          <p style={{ marginBottom: 10 }}>
            Ban User
          </p>
          <fieldset >
            <label htmlFor="width" style={{position:"relative", bottom:"40%", padding:"10px"}}>
              Message
            </label>
            <textarea value="ban-reason"></textarea>
          </fieldset>
          <fieldset>
            <DeleteUserButton
            id = {props.id}
            token = {props.token}
            />
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

export default banButton;