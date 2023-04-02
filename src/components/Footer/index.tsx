import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} 希望天天开心快乐`}
      links={[
        {
          key: 'notnull webfont',
          title: 'NotNull Webfont',
          href: 'https://github.com/duizhang1/font-project',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/duizhang1/font-project',
          blankTarget: true,
        }
      ]}
    />
  );
};

export default Footer;
