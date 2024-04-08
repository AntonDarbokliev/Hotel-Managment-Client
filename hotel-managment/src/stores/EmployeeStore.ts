import { create } from 'zustand';
import { ReceivedEmployee } from '../types/ReceivedEmployee';

interface EmployeeStore  {
    employees: ReceivedEmployee[],
    setEmployees: (
        newArrOrSetterFn: ReceivedEmployee[] | (( employees: ReceivedEmployee[]) => ReceivedEmployee[])
    ) => void
}


export const useEmployeeStore = create<EmployeeStore>()(
    (set) => ({
      employees: [],
      setEmployees: (newArrOrSetterFn) => {
        set(({ employees }) => {
          if (Array.isArray(newArrOrSetterFn)) {
            const newArr = newArrOrSetterFn;
            return { employees: newArr };
          }
          const setterFn = newArrOrSetterFn;
          return {
            employees: setterFn(employees)
          };
        });
      }
    })
  );
