import { useState, useEffect } from "react";
import Base from "./Base";
import { Button } from "@material-ui/core";
import Podzial from "../../../api/podzial";
import { socket } from "../../../App";

function DropdownBaseTable({ item, country }) {
  const [newBases, setNewBases] = useState([{ id: 1, id_for_base: item.id_for_base }]);
  const [currentBases, setCurrentBases] = useState([]);
  const [deleteBases, setDeleteBases] = useState([]);

  async function createBase(currentBases, newBases, item) {
    try {
      const result = await Podzial.createBase([...currentBases, ...newBases.filter((el) => !!el.podzial_id)], country);
      setNewBases([{ id: 1, id_for_base: item.id_for_base }]);
      if (result.update) {
        await getBasesForCity(item);
        alert("Обновлено");
      } else {
        if (result.notIdForBase) {
          return alert("Не указан id_for_base");
        }
        if (result.bases[0]) {
          await getBasesForCity(item);
          return alert("Успешно создано");
        }
        alert("Нет изменений");
      }
    } catch (e) {
      alert("Что-то пошло не так");
    }
  }

  async function deleteBase(deleteBases, item) {
    try {
      await Promise.all(deleteBases?.map(async (id) => await Podzial.deleteBase(country, Number(id))));
      setDeleteBases([]);
      await getBasesForCity(item);
      alert("Success");
    } catch (e) {
      alert("Что-то пошло не так");
    }
  }

  async function getBasesForCity(item) {
    const data = await Podzial.getBasesForCity(Number(item.id_for_base) || 0, country);
    if (data) {
      setCurrentBases(data);
    }
  }

  function addNewEmptyBase(newBases, setNewBases) {
    const lastId = newBases?.reduce((sum, el) => (Number(el.id) > sum ? el.id : sum), 0);
    setNewBases((prev) => [...prev, { id: lastId + 1, id_for_base: item.id_for_base }]);
  }

  function changeDeleteBases(checked, id) {
    if (checked) {
      setDeleteBases((prev) => [...prev, id]);
    } else {
      setDeleteBases((prev) => prev.filter((item) => item !== id));
    }
  }

  useEffect(() => {
    socket.on("updateBases", ({ data }) => {
      if (data.country === country) {
        let updatedBases = currentBases?.map((city) => {
          const updatedBase = data.bases.filter((el) => Number(el.id) === city.id)[0];
          return updatedBase ? updatedBase : city;
        });
        const newBases = data.bases.filter((el) => {
          return !currentBases?.filter((item) => item.id_for_base === el.id_for_base)?.filter((item) => item.id === el.id)[0];
        });
        updatedBases = [...updatedBases, ...newBases];
        setCurrentBases(updatedBases);
      }
    });
    // eslint-disable-next-line
  }, [currentBases, setCurrentBases]);

  useEffect(() => {
    socket.on("deleteBase", ({ data }) => {
      if (data.country === country) {
        const filteredBases = currentBases?.filter((el) => Number(el.id) !== Number(data.deleteBase));
        setCurrentBases(filteredBases);
      }
    });
    // eslint-disable-next-line
  }, [currentBases, setCurrentBases]);

  useEffect(() => {
    getBasesForCity(item);
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ position: "relative", marginTop: "40px" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {currentBases
          ?.sort((a, b) => Number(b.id) - Number(a.id))
          .map((item) => (
            <Base item={item} setCurrentBases={setCurrentBases} changeDeleteBases={changeDeleteBases} />
          ))}
        {newBases.map((item) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Base item={item} forCheckTable={true} setCurrentBases={setNewBases} setNewBases={setNewBases} />
          </div>
        ))}
        <Button style={{ fontWeight: 700, fontSize: "70px" }} onClick={() => addNewEmptyBase(newBases, setNewBases)}>
          +
        </Button>
      </div>{" "}
      <>
        <Button
          onClick={async () => createBase(currentBases, newBases, item)}
          style={{ color: "black", fontSize: "30px", position: "absolute", top: "-35px", left: "200px", transform: "translate(-50%, -50%)" }}
        >
          Внести изменения
        </Button>
        <Button onClick={async () => deleteBase(deleteBases, item)} style={{ color: "black", fontSize: "30px", position: "absolute", top: "-35px", left: "450px", transform: "translate(-50%, -50%)" }}>
          Удалить
        </Button>
      </>
    </div>
  );
}

export default DropdownBaseTable;
