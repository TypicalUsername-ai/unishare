import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';
import deleteUser from "../../functions/deleteUser";




const banButton = (props) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button className='seeMore' aria-label="Update dimensions">
        Ban User
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content sideOffset={5}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ marginBottom: 10 }}>
            Ban User
          </p>
          <fieldset >
            <label htmlFor="width">
              Reason
            </label>
            <textarea></textarea>
          </fieldset>
          <fieldset>
            <button className="seeMore" onClick={deleteUser(props.id, props.token)}>Ban User</button>
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