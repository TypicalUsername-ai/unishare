import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';
import Report from '../../functions/repor';




const ReportButton = (props) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button className='seeMore' aria-label="Update dimensions">
        {props.headline}
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content sideOffset={5}>
        <div style={{ display: 'flex', backgroundColor:"white", flexDirection: 'column', gap: 10 }}>
          <p style={{ marginBottom: 10 }}>
            {props.headline2}
          </p>
          <fieldset >
            <label htmlFor="width" style={{position:"relative", bottom:"40%", padding:"10px"}}>
              Message
            </label>
            <textarea></textarea>
          </fieldset>
          <fieldset>
            <label>Tag</label>
            <select name="report">
                    <option value="example">example</option>
                    <option value="example1">example1</option>
                    <option value="example2">example2</option>
                    <option value="example3">example3</option>
                </select>
          </fieldset>
          <fieldset>
            <button onClick={Report(props.id, props.token)}>Report User</button>
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

export default ReportButton;