import { useState } from "react"
import { Alert, message } from "antd"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { ProFormText, LoginForm } from "@ant-design/pro-form"
import { history } from "umi"
import Footer from "@/components/Footer"
import { login } from "@/apis/admin"
import styles from "./index.less"

const Login = () => {
    const [loginSuccess, setLoginSuccess] = useState({})

    const handleSubmit = async (values) => {
        try {
            const { success, data: { token } } = await login({ ...values })
            if (success) {
                message.success('登录成功！')
                localStorage.setItem('token', token)
                if (!history) return
                const { query } = history.location
                const { redirect } = query
                history.push(redirect || "/")
                return
            }
            setLoginSuccess(success)
        } catch (error) {
            message.error('登录失败，请重试！')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <LoginForm
                    logo={<img alt="logo" src="/logo.svg" />}
                    title="Ant Design"
                    subTitle="Ant Design 是西湖区最具影响力的 Web 设计规范"
                    onFinish={async (values) => {
                        await handleSubmit(values)
                    }}
                >
                    {!loginSuccess && (
                        <Alert
                            type="error"
                            showIcon
                            message="账户或密码错误(admin/123456)"
                            style={{ marginBottom: 24 }}
                        />
                    )}
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: "large",
                                prefix: <UserOutlined className={styles.prefixIcon} />
                            }}
                            placeholder="用户名: admin or user"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入用户名！"
                                }
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: "large",
                                prefix: <LockOutlined className={styles.prefixIcon} />
                            }}
                            placeholder="密码: 123456"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入密码！"
                                }
                            ]}
                        />
                    </>
                </LoginForm>
            </div>
            <Footer />
        </div>
    )
}

export default Login
