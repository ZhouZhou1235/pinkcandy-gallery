import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from "@mui/material";
import { RegisterForm } from "../component/form/RegisterForm";
import { LoginForm } from "../component/form/LoginForm";
import { ResetPasswordForm } from "../component/form/ResetPasswordForm";
import { GArea } from "../vars/ConstVars";


export function Login(){
    return(
        <Box>
            <div className="container p-3">
                <div className="row align-items-center">
                    <div className="col-lg-8 col-md-7">
                        <div className="text-center">
                            <img 
                                src={GArea.SkyblueHound} 
                                alt="login" 
                                className="img-fluid rounded shadow" 
                                style={{maxHeight: '70vh', objectFit: 'contain'}}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-5">
                        <Container sx={{p:2}}>
                            <div className="text-center mb-4">
                                <img 
                                    src={GArea.titleURL} 
                                    alt="logo" 
                                    className="d-block mx-auto m-2" 
                                    width={'100%'} 
                                    style={{maxWidth:'400px'}} 
                                />
                            </div>
                            <div className="text-muted">
                                幻想动物画廊是一个非商业性质的毛绒绒主题中文艺术网站，
                                用户能发布分享有关毛绒绒的绘画作品。
                            </div>
                        </Container>
                        <Container sx={{p:2}}>
                            <div>
                                <Accordion defaultExpanded className="mb-2 shadow-sm">
                                    <AccordionSummary
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                    <Typography component="span" className="fw-bold">登录</Typography>
                                    </AccordionSummary>
                                    <LoginForm />
                                </Accordion>
                                <Accordion className="mb-2 shadow-sm">
                                    <AccordionSummary
                                        aria-controls="panel2-content"
                                        id="panel2-header"
                                    >
                                    <Typography component="span" className="fw-bold">注册</Typography>
                                    </AccordionSummary>
                                    <RegisterForm />
                                </Accordion>
                                <Accordion className="shadow-sm">
                                    <AccordionSummary
                                        aria-controls="panel3-content"
                                        id="panel3-header"
                                    >
                                    <Typography component="span" className="fw-bold">重设密码</Typography>
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
