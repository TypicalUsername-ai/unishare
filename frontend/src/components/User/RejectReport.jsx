import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import BanSuccessful from '../admin/BanSuccessful';
import rejectReport from '../../functions/rejectReport';


const RejectReport = (props) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button onClick={rejectReport(props.id, props.token)}>Reject Report</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay/>
        <AlertDialog.Content>
          <AlertDialog.Title className="AlertDialogTitle">Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            This action cannot be undone. 
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
  
  export default RejectReport;
  