import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import BanSuccessful from '../admin/BanSuccessful';
import acceptReport from '../../functions/acceptReport';


const DeleteUserButton = (props) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button onClick={acceptReport(props.id, props.token)}>Ban User</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay/>
        <AlertDialog.Content>
          <AlertDialog.Title className="AlertDialogTitle">Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialog.Description>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <button className="Button mauve">Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <BanSuccessful
                type="Delete User"
              />
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
  
  export default DeleteUserButton;
  