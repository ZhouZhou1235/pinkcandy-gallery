import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from "@mui/material";
import { RegisterForm } from "../component/RegisterForm";
import { LoginForm } from "../component/LoginForm";
import { ResetPasswordForm } from "../component/ResetPasswordForm";

export function Login(){
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
                                这是一个中文毛绒绒站点<br />
                                输入粉糖账号和密码登录<br />
                                也可以使用邮箱<br />
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
