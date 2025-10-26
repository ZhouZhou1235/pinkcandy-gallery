import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from "@mui/material";
import { RegisterForm } from "../component/form/RegisterForm";
import { LoginForm } from "../component/form/LoginForm";
import { ResetPasswordForm } from "../component/form/ResetPasswordForm";
import { useEffect } from "react";
import { PageTitle } from "../vars/ConstVars";

export function Login(){
    useEffect(()=>{
        document.title = PageTitle.login
    },[])
    return(
        <Box>
            <div className="container p-3">
                <div className="row">
                    <div className="col-sm-8">
                        <img src="/images/login.png" alt="login" width={'100%'} />
                    </div>
                    <div className="col-sm-4">
                        <Container sx={{p:2}}>
                            <h1>堆积更多的毛绒绒！</h1>
                            <div>
                                幻想动物画廊🐾是一个非商业性质中文艺术图站，<br />
                                用户可以浏览、发布分享有关毛绒绒的绘画作品。<br />
                                如有问题请联系<a href="https://pinkcandy.top">站长</a><br />
                            </div>
                        </Container>
                        <Container sx={{p:2}}>
                            <div>
                                <Accordion defaultExpanded>
                                    <AccordionSummary
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                    <Typography component="span">登录</Typography>
                                    </AccordionSummary>
                                    <LoginForm />
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                    <Typography component="span">注册</Typography>
                                    </AccordionSummary>
                                    <RegisterForm />
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        aria-controls="panel3-content"
                                        id="panel3-header"
                                    >
                                    <Typography component="span">重设密码</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ResetPasswordForm />
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        </Box>
    )
}
