import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';



const Welcome: React.FC = () => {

  return (
    <PageContainer>
      <Card>
        <span style={{color: 'rgb(24, 144, 255)'}}>欢迎使用NotNull社区后台管理系统</span>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
