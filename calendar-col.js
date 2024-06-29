export const columns = [
    {
      "header": "Month",
      "accessorKey": "month"
    },
    {
        "header": "Year",
        "accessorKey": "year"
      },
      {
        "header": "Working Days",
        "accessorKey": "workingdays"
      } ,
      {
        "header": "Events",
        "cell": ({cell}) => {
          const subrows = cell.row.original.days;
          return (
            <div>
                {subrows.map((subrow, index) => (
                    subrow.eventname ? (
                        <div key={index}>
                            {`Date: ${subrow.date}, Day: ${subrow.day}, Event: ${subrow.eventname}`}
                        </div>
                    ) : ''
                ))}
            </div>
        );
        }
      } 
   /*  {
      "header": "Game Type",
      "accessorKey": "game type",
      "cell": ({cell}) => {
        const subrows = cell.row.original.subrows;
        return (
          <div>
            {subrows.map((subrow, index) => (
              <div key={index}>
                {subrow["game type"]}
              </div>
            ))}
          </div>
        );
      },
      // use custom filter function directly
        filterFn: (row, columnId, filterValue) => {
            // if filterValue is present in the game type of any subrow, return true
            return row.original.subrows.some(subrow => {return subrow["game type"].toLowerCase().includes(filterValue);});
      },
    },
    {
      "header": "Initial Value (Type)",
      "accessorKey": "initial value and type",
      "cell": ({cell}) => {
        const subrows = cell.row.original.subrows;
        return (
          <div>
            {subrows.map((subrow, index) => (
              <div key={index}>
                {subrow["initial value"]}
              </div>
            ))}
          </div>
        );
      },
      enableColumnFilter: false
    },
    {
      "header": "Configurable By",
      "accessorKey": "configurable by",
      "cell": ({cell}) => {
        const subrows = cell.row.original.subrows;
        return (
          <div>
            {subrows.map((subrow, index) => (
              <div key={index}>
                {subrow["configurable by"]}
              </div>
            ))}
          </div>
        );
      },
      enableColumnFilter: false
    },
    {
      "header": "Description",
      "accessorKey": "description",
      "cell": ({cell}) => {
        const subrows = cell.row.original.subrows;
        return (
          <div>
            {subrows.map((subrow, index) => (
              <div key={index}>
                {subrow["description"]}
              </div>
            ))}
          </div>
        );
      },
      enableColumnFilter: false
    } */
  ];