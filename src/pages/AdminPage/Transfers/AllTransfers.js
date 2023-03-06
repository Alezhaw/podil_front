import { useState } from "react";
import { StyledInput } from "../../../style/styles";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Transfers from "./transfers";
import TransfersToUser from "./transfersToUser";


function AllTransfers() {

  const [search, setSearch] = useState('');
  const [transferType, setTransferType] = useState('true');

  return <>

    <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <StyledInput className="tabl-flex-admin-search"
        style={{ color: "white", borderRadius: "5px", paddingLeft: '10px' }}
        type="search"
        id='Search'
        value={search}
        placeholder="Поиск"
        onChange={(e) => setSearch(e.target.value?.toLowerCase())}
        autoComplete="off"
        required />

      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue={true}
          onChange={(e) => setTransferType(e.target.value)}
        >
          <FormControlLabel value='true' control={<Radio />} label="Перевод по реквизитам" />
          <FormControlLabel value='false' control={<Radio />} label="Перевод пользователю" />
        </RadioGroup>
      </FormControl>
    </div>

    {transferType === 'true' ? <Transfers search={search} /> : <TransfersToUser search={search} />}

  </>
}

export default AllTransfers