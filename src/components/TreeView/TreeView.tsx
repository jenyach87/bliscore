import React, { useState } from 'react';
import { IDataType, IChildren, IChildrenSecond } from '../../models/DataType';
import styles from "./TreeViw.module.css"

interface ITreeViewProps {
  data: IDataType;
}

const TreeView: React.FC<ITreeViewProps> = ({ data }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [openItemsChild, setOpenItemsChild] = useState<{ [key: string]: boolean }>({});

  const handleOpen = (cityId: string) => {
    setOpenItems(prevState => ({
      ...prevState,
      [cityId]: !prevState[cityId],
    }));
  };

  const handleOpenChild = (shopId: string) => {
    setOpenItemsChild(prevState => ({
      ...prevState,
      [shopId]: !prevState[shopId],
    }));
  };

  const calculateSummary = (children: IChildrenSecond[]) => {
    const totalSalary = children.reduce((acc, child) => acc + child.salary, 0);
    const averageAge = children.reduce((acc, child) => acc + child.age, 0) / children.length;
    return { totalSalary, averageAge };
  };

  const calculateShopSummary = (children: IChildren[]) => {
    let totalSalary = 0;
    let totalAge = 0;
    let employeeCount = 0;

    children.forEach((shop) => {
      if (shop.children) {
        const { totalSalary: shopSalary, averageAge: shopAverageAge } = calculateSummary(shop.children);
        totalSalary += shopSalary;
        totalAge += shopAverageAge * shop.children.length;
        employeeCount += shop.children.length;
      }
    });

    const averageAge = employeeCount ? totalAge / employeeCount : 0;
    return { totalSalary, averageAge };
  };
  const firstLevelTree = (): JSX.Element => {
    return (
      <>
        {data.map(city => {
          const { totalSalary, averageAge } = calculateShopSummary(city.children || []);
          return (
            <div key={city.cityId}>
              <div
                onClick={() => handleOpen(city.cityId)}
                className={styles.first_level}
              >
                {city.name} Salary: {totalSalary} Age: {averageAge.toFixed(1)} {openItems[city.cityId] ? '▼' : '▶'}
              </div>
              {openItems[city.cityId] && city.children && (
                <div style={{ marginLeft: '70px' }}>
                  {secondLevelTree(city.children)}
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  };

  const secondLevelTree = (secondLevel: IChildren[]): JSX.Element => {
    return (
      <>
        {secondLevel.map(shop => {
          const { totalSalary, averageAge } = calculateSummary(shop.children || []);
          return (
            <div key={shop.shopId}>
              <div
                onClick={() => handleOpenChild(shop.shopId)}
                className={styles.second_level}
              >
                {shop.name} Salary: {totalSalary} Age: {averageAge.toFixed(1)} {openItemsChild[shop.shopId] ? '▼' : '▶'}
              </div>
              {openItemsChild[shop.shopId] && shop.children && (
                <div style={{ marginLeft: '20px' }}>
                  {thirdLevelTree(shop.children)}
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  };

  const thirdLevelTree = (thirdLevel: IChildrenSecond[]): JSX.Element => {
    return (
      <>
        {thirdLevel.map(employee => (
          <div key={employee.managerId} className={styles.third_level}>
            {employee.name} Salary: {employee.salary} Age: {employee.age}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className={styles.tree_view}>
      {firstLevelTree()}
    </div>
  );
};

export default TreeView;

