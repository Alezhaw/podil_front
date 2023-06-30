import { useState, useEffect } from "react";
import Base from "./Base";
import { Button } from "@material-ui/core";
import { axiosGetAllBasesRu, axiosCreateBaseRu, axiosDeleteBaseRu } from "../../../api/podzialRu";
import { axiosGetAllBasesKz, axiosCreateBaseKz, axiosDeleteBaseKz } from "../../../api/podzialKz";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../../store/Users/types";

function DropdownBaseTable ({item, bases, country}) {
    const dispatch = useDispatch();
    const [newBases, setNewBases] = useState([{id: 1, id_for_base: item.id_for_base}])
    const [currentBases, setCurrentBases] = useState([]);
    const [deleteBases, setDeleteBases] = useState( []);
    const axiosFunctions = (country === 'cityRu'? 
    {getBases: axiosGetAllBasesRu, createBase: axiosCreateBaseRu, deleteBase: axiosDeleteBaseRu}
    : {getBases: axiosGetAllBasesKz, createBase: axiosCreateBaseKz, deleteBase: axiosDeleteBaseKz});

    async function createBase(currentBases, newBases) {
        try {
            const result = await axiosFunctions.createBase([...currentBases, ...newBases.filter(el => !!el.base_id)]);
            setNewBases([{id: 1, id_for_base: item.id_for_base}]);
            if (result.update) {
              await getAllBases();
              alert("Обновлено");
            } else {
              if (result.notIdForBase) {
                return alert("Не указан id_for_base");
              }
              if (result.bases[0]) {
                await getAllBases();
                return alert("Успешно создано");
              }
              alert("Что-то пошло не так");
            }
        } catch (e) {
          alert("Что-то пошло не так");
        }
      }

      async function deleteBase(deleteBases) {
        try {
          await Promise.all(deleteBases?.map(async (id) => await axiosFunctions.deleteBase(Number(id))));
          setDeleteBases([]);
          await getAllBases();
          alert("Success");
        } catch (e) {
          alert("Что-то пошло не так");
        }
      }
    
      async function getAllBases() {
        const data = await axiosFunctions.getBases();
        if (data) {
          dispatch({
            type: reducerTypes.GET_BASES_RU,
            payload: data,
          });
        }
      }

    function addNewEmptyBase(newBases, setNewBases) {
        const lastId = newBases?.reduce((sum, el) => Number(el.id) > sum ? el.id : sum, 0);
        setNewBases(prev => [...prev, {id: lastId + 1, id_for_base: item.id_for_base}]);
    }

    function changeDeleteBases(checked, id) {
        if (checked) {
          setDeleteBases((prev) => [...prev, id]);
        } else {
          setDeleteBases((prev) => prev.filter((item) => item !== id));
        }
      }

    useEffect(() => {
        setCurrentBases(bases?.filter((base) => base.id_for_base === item.id_for_base))
        // eslint-disable-next-line
      }, [bases]);

    return <div style={{position: 'relative', marginTop: '40px' }} >
    <div style={{display: "flex", flexDirection: "row"}}>{currentBases.map((item) => (
                        <Base item={item} setCurrentBases={setCurrentBases} changeDeleteBases={changeDeleteBases}/>
                      ))}
                      {newBases.map((item) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>     
                      <Base item={item} forCheckTable={true} setCurrentBases={setNewBases} setNewBases={setNewBases} />
                      </div>
                        
                      ))}
                                <Button 
            style={{fontWeight: 700, fontSize: "70px"}}
            onClick={() => addNewEmptyBase(newBases, setNewBases)}>
            +
          </Button>
          </div> <>
          <Button onClick={async () => createBase(currentBases, newBases)} style={{ color: "black", fontSize: "30px", position: "absolute", top: '-35px', left: "200px", transform: "translate(-50%, -50%)" }}>
              Внести изменения
            </Button>
            <Button onClick={async () => deleteBase(deleteBases)} style={{ color: "black", fontSize: "30px", position: "absolute", top: '-35px', left: "450px", transform: "translate(-50%, -50%)" }}>
              Удалить
            </Button>
            </>
    </div>
}

export default DropdownBaseTable;