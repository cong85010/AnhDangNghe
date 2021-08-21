import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const pageNotFound = () => {
    return (
        <Result
        status="404"
        extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
      />
    );
}

export default pageNotFound;
