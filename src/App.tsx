import { useEffect, useState } from "react";
import { generateKennelMap } from "./db";
import { Cage } from "./types";
import classNames from "classnames";
import { format, isAfter, sub } from "date-fns";
import { setupCollection } from "./mongo";

const isCageOrange = (cage: Cage) => {
  return !isAfter(
    new Date(
      cage.history.reduce(
        (acc, next) => Math.max(acc, next.utcTime),
        0
      )
    ),
    sub(new Date(), { months: 1 })
  );
};
const isCageBlue = (cage: Cage) => {
  return isAfter(
    new Date(
      cage.history.reduce(
        (acc, next) => Math.max(acc, next.utcTime),
        0
      )
    ),
    sub(new Date(), { weeks: 1 })
  );
};

function App() {
  const [kennelMap, setKennelMap] =
    useState<ReturnType<typeof generateKennelMap>>();
  const [modal, setModal] = useState<Cage | undefined>();
  const [selectMultiple, setSelectMultiple] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState<Cage[]>();
  const [inputNotes, setInputNotes] = useState<string>();
  const [collection, setCollection] =
    useState<Awaited<ReturnType<typeof setupCollection>>>();
  useEffect(() => {
    (async () => {
      const newCollection = await setupCollection();
      setCollection(newCollection);
      const cages = await newCollection?.find({});
      setKennelMap(generateKennelMap(cages as any));
    })();
  }, []);
  const selectCage = (newCage: Cage) => {
    if (selectMultiple) {
      let newSelection = multipleSelected ?? [];
      if (multipleSelected?.find((e) => e.id === newCage.id)) {
        newSelection = newSelection.filter(
          (e) => e.id !== newCage.id
        );
      } else {
        newSelection = [
          ...(newSelection ? [...newSelection] : []),
          newCage,
        ];
      }
      setMultipleSelected(newSelection);
    } else {
      setInputNotes(newCage.notes);
      setModal(newCage);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col px-2">
        <div className="flex h-full w-full flex-row">
          <div className="flex h-full w-full flex-[49] flex-row">
            <div className="mr-4 flex h-full w-full flex-col">
              {kennelMap?.[0].map((e) => (
                <div
                  className={classNames(
                    "mb-2 flex h-full cursor-pointer select-none items-center justify-center rounded-md px-1 text-sm text-white bg-green-600 hover:bg-green-500",
                    {
                      "!bg-orange-600 hover:!bg-orange-500":
                        isCageOrange(e),
                      "!bg-blue-600 hover:!bg-blue-500":
                        isCageBlue(e),
                      "!bg-yellow-600 hover:!bg-yellow-500":
                        multipleSelected?.find(
                          (selected) => selected.id === e.id
                        ),
                    }
                  )}
                  onClick={() => selectCage(e)}
                >
                  {e.id}
                </div>
              ))}
            </div>
            <div className="flex h-full w-full flex-col">
              {kennelMap?.[1].map((e, i) => {
                return (
                  <div
                    className={`flex h-full  flex-row ${
                      i === 0 ? "mb-8" : ""
                    }`}
                  >
                    {e.map((e) => (
                      <div
                        className={classNames(
                          "mb-2 mr-2 flex w-full cursor-pointer select-none items-center justify-center rounded-md bg-green-600 px-1 text-sm text-white hover:bg-green-500",
                          {
                            "!bg-orange-600 hover:!bg-orange-500":
                              isCageOrange(e),
                            "!bg-blue-600 hover:!bg-blue-500":
                              isCageBlue(e),
                            "!bg-yellow-600 hover:!bg-yellow-500":
                              multipleSelected?.find(
                                (selected) => selected.id === e.id
                              ),
                          }
                        )}
                        onClick={() => selectCage(e)}
                      >
                        {e.id}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="ml-2 flex h-full w-full flex-[100] flex-row">
            <div className="flex h-full w-full flex-col">
              {kennelMap?.[2].map((e, i) => {
                return (
                  <div
                    className={`mr-2 flex h-full flex-row ${
                      i === 0 ? "mb-8" : ""
                    } `}
                  >
                    {e.map((e) => (
                      <div
                        className={classNames(
                          "mb-2 mr-2 flex w-full cursor-pointer select-none items-center justify-center rounded-md bg-green-600 px-1 text-sm text-white hover:bg-green-500",
                          {
                            "!bg-orange-600 hover:!bg-orange-500":
                              isCageOrange(e),
                            "!bg-blue-600 hover:!bg-blue-500":
                              isCageBlue(e),
                            "!bg-yellow-600 hover:!bg-yellow-500":
                              multipleSelected?.find(
                                (selected) => selected.id === e.id
                              ),
                          }
                        )}
                        onClick={() => selectCage(e)}
                      >
                        {e.id}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
            <div className="flex h-full w-full flex-col">
              {kennelMap?.[3].map((e) => (
                <div
                  className={classNames(
                    "mb-2 flex h-full cursor-pointer select-none items-center justify-center rounded-md bg-green-600 px-1 text-sm text-white hover:bg-green-500",
                    {
                      "!bg-orange-600 hover:!bg-orange-500":
                        isCageOrange(e),
                      "!bg-blue-600 hover:!bg-blue-500":
                        isCageBlue(e),
                      "!bg-yellow-600 hover:!bg-yellow-500":
                        multipleSelected?.find(
                          (selected) => selected.id === e.id
                        ),
                    }
                  )}
                  onClick={() => selectCage(e)}
                >
                  {e.id}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex h-11 w-full flex-row items-center justify-center">
          <div className="flex flex-1 flex-col">
            <div className="flex flex-row items-center">
              <div className="mr-2 h-4 w-4 bg-blue-500" />
              <div>Passeado na ultima semana</div>
            </div>
            <div className="flex flex-row items-center">
              <div className="mr-2 h-4 w-4 bg-green-500" />
              <div>Passeado no ultimo mes</div>
            </div>
            <div className="flex flex-row items-center">
              <div className="mr-2 h-4 w-4 bg-orange-500" />
              <div>Passeado ha mais de um mes</div>
            </div>
            <div className="flex flex-row items-center">
              <div className="mr-2 h-4 w-4 bg-yellow-500" />
              <div>Selecionado</div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="mr-4 flex flex-col">
              {kennelMap?.[4].map((e) => (
                <div
                  className={classNames(
                    "mb-2 flex h-full cursor-pointer select-none items-center justify-center rounded-md bg-green-600 px-1 text-sm text-white hover:bg-green-500",
                    {
                      "!bg-orange-600 hover:!bg-orange-500":
                        isCageOrange(e),
                      "!bg-blue-600 hover:!bg-blue-500":
                        isCageBlue(e),
                      "!bg-yellow-600 hover:!bg-yellow-500":
                        multipleSelected?.find(
                          (selected) => selected.id === e.id
                        ),
                    }
                  )}
                  onClick={() => selectCage(e)}
                >
                  {e.id}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              {kennelMap?.[5].map((e) => (
                <div
                  className={classNames(
                    "mb-2 flex h-full cursor-pointer select-none items-center justify-center rounded-md bg-green-600 px-1 text-sm text-white hover:bg-green-500",
                    {
                      "!bg-orange-600 hover:!bg-orange-500":
                        isCageOrange(e),
                      "!bg-blue-600 hover:!bg-blue-500":
                        isCageBlue(e),
                      "!bg-yellow-600 hover:!bg-yellow-500":
                        multipleSelected?.find(
                          (selected) => selected.id === e.id
                        ),
                    }
                  )}
                  onClick={() => selectCage(e)}
                >
                  {e.id}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-1 flex-col items-end pt-10">
            <div className="flex flex-row items-center ">
              <input
                type="checkbox"
                id="walk-multiple"
                checked={selectMultiple}
                onChange={() => {
                  setSelectMultiple((e) => !e);
                }}
              />
              <label className="ml-2" htmlFor="walk-multiple">
                Selecionar Varios
              </label>
            </div>
            {selectMultiple &&
              multipleSelected &&
              multipleSelected?.length > 0 && (
                <div
                  onClick={async () => {
                    multipleSelected?.forEach((e) => {
                      e.history.unshift({ utcTime: Date.now() });
                    });
                    await collection?.updateMany(
                      {
                        id: {
                          $in: multipleSelected.map((e) => e.id),
                        },
                      },
                      {
                        $push: { history: { utcTime: Date.now() } },
                      }
                    );
                    setMultipleSelected(undefined);
                    setSelectMultiple(false);
                  }}
                  className="flex h-11 w-fit cursor-pointer select-none items-center justify-center rounded-md bg-green-600 px-4 text-white hover:bg-green-500 "
                >
                  Passear Selecionados
                </div>
              )}
          </div>
        </div>
      </div>
      {modal !== undefined && (
        <div
          className="absolute inset-0 bottom-10 flex h-[100vh] items-center justify-center bg-gray-700/30"
          onClick={() => {
            setModal(undefined);
          }}
        >
          <div
            className="flex h-4/5 w-4/5 flex-col justify-between bg-white p-4"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex items-center justify-between font-bold">
              Jaula {modal.id}
              <i
                onClick={() => {
                  setModal(undefined);
                }}
                className="fa-solid fa-xmark hover:text-gray-400"
              />
            </div>
            <div className="my-2 flex h-full flex-row overflow-y-auto">
              <div className="flex flex-col">
                <div className="mb-1 flex flex-row justify-between">
                  Notas:
                  {inputNotes !== modal.notes && (
                    <div
                      onClick={async () => {
                        if (inputNotes) {
                          modal.notes = inputNotes;

                          await collection?.updateOne(
                            {
                              id: {
                                $eq: modal.id,
                              },
                            },
                            {
                              $set: { notes: inputNotes },
                            }
                          );
                          setModal({ ...modal });
                        }
                      }}
                      className="flex h-6 w-fit cursor-pointer select-none items-center justify-center rounded-md bg-green-600 px-2 text-white hover:bg-green-500"
                    >
                      Gravar
                    </div>
                  )}
                </div>
                <div className="flex h-full flex-1 rounded border border-gray-300 p-2">
                  <textarea
                    rows={4}
                    cols={50}
                    className="flex h-full w-full"
                    onChange={(e) => {
                      setInputNotes(e.target.value);
                    }}
                  >
                    {inputNotes}
                  </textarea>
                </div>
              </div>
              <div className="ml-2 overflow-y-auto">
                {modal.history.length > 0 && (
                  <div className="mb-1 flex">Passeios:</div>
                )}
                {modal.history.map((e, i) => {
                  return (
                    <div className="mb-2 flex w-fit flex-row items-center rounded border border-gray-300 p-2 hover:bg-gray-100">
                      {format(new Date(e.utcTime), "P, HH:mm")}
                      <i
                        onClick={() => {
                          modal.history.splice(i, 1);
                          setModal({ ...modal });
                        }}
                        className="fa-solid fa-trash pl-2 text-gray-600 hover:text-gray-400"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              onClick={async () => {
                await collection?.updateOne(
                  {
                    id: {
                      $eq: modal.id,
                    },
                  },
                  {
                    $push: { history: { utcTime: Date.now() } },
                  }
                );
                modal.history.unshift({ utcTime: Date.now() });
                setModal({ ...modal });
              }}
              className="flex h-11 min-h-[2.75rem] cursor-pointer select-none items-center justify-center rounded-md bg-green-600 px-1 text-white hover:bg-green-500 "
            >
              Passear
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
