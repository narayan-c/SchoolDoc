

import { PesterDataTable} from "@site/src/components/PesterDataTable";
import {calendar } from "@site/calendar";
import {columns} from "@site/calendar-col";
 



export default function Hello() {
  return (
      <div
        style={{
          fontSize: '20px',
        }}>
        <PesterDataTable
  columns={columns}
  data={ calendar }
/>
      </div>
  );
}