'use client';
import { usePathname, } from 'next/navigation';
import { data } from '@/constant/data';
import Navbar from '@/component/docs/layout/navbar';

const Item = () => {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const item = segments[segments.length - 1];
  const Item = data.find((i) => i.item === item);

  if (!Item) {
    return <div>Item not found</div>;
  }

  return (
    <div>
      <h1>{Item.item}</h1>
      {Item.subitem.map((subitem, index) => (
        <div key={index}>
          <h2>{subitem.subitem}</h2>
          {subitem.activity.map((activity, activityIndex) => (
            <div key={activityIndex}>
              <h3>{activity.activity}</h3>
              <p>{activity.definition}</p>
              <p>{activity.purpose}</p>
              <p>{activity.procedure}</p>
              <p>{activity.criteria}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Item;