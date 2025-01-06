/* eslint-disable react/prop-types */

// components
import Content from "./Content";
import Tabs from "./Tabs";

function TabComponent(props) {
  const { currentTab, onChange, tabs, content } = props;

  return (
    <div>
      <Tabs tabs={tabs} currentTab={currentTab} onChange={onChange} />
      <Content content={content} />
    </div>
  );
}

export default TabComponent;
