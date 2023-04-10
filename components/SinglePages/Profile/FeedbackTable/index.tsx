import * as React from 'react';

//Hooks
import { useEffect } from "react";

//Store
import { feedbackActions } from 'redux/index';
import { useDispatch, useSelector } from 'react-redux'

//UI
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

//IconContainerProps
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';

//Helpers
import { DB, NA, PS, Architecture, HR, InterviewFeedbackI, ReactionE, getReactionComponent, feedbackStatusE, interviewUIArray } from '@helpers/index';
import Stack from '@mui/material/Stack';

function createData(data: InterviewFeedbackI) {
    return data;
}


function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset', backgroundColor: '#f5f5f5' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.startTime.toLocaleDateString()}
                </TableCell>
                <TableCell align="left">{interviewUIArray[row.interviewType].name}</TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="right">{getReactionComponent(row.overallScore)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: '#f5f5f5' }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography component={'span'} variant="body1" gutterBottom>
                                {/* Details */}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Profile</TableCell>
                                        <TableCell align="left">Detailed Feedback</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow key={row._id}>
                                        <TableCell align="left">{'Link'}</TableCell>
                                        <TableCell align="left">{row.details}</TableCell>
                                        <TableCell align="center">
                                            {(row.status === feedbackStatusE.none) ? (
                                                <ButtonGroup
                                                    disableElevation
                                                    variant="contained"
                                                    aria-label="Disabled elevation buttons"

                                                >
                                                    <Button color='success'>Accept</Button>
                                                    <Button color='error'>Reject</Button>
                                                </ButtonGroup>
                                            ) : (<div style={row.status === feedbackStatusE.accepted ? { color: '#07C82A' } : { color: '#DE3005' }}>
                                                {row.status === feedbackStatusE.accepted ? <CheckCircleIcon /> : <DangerousIcon />}
                                            </div>
                                            )}
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function FeedbackTable() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //Feedback array UI for row
    const [feedbackDataForUI, setFeedbackDataForUI] = React.useState<Array<InterviewFeedbackI>>([]);


    //Loading Feedback
    const dispatch = useDispatch();
    const feedbacks = useSelector((state: any) => state.feedback);

    useEffect(() => {
        const loadFeedbacks = async () => {
            await dispatch(feedbackActions.requestMyFeedbacks());
        }

        loadFeedbacks();

    }, [dispatch]);

    useEffect(() => {
        if (feedbacks && feedbacks.feedbacksCount > 0) {
            const bufferFeedbackData: Array<InterviewFeedbackI> = [];
            feedbacks.feedbacks.forEach((element: InterviewFeedbackI, index: number) => {
                bufferFeedbackData.push({
                    _id: element._id,
                    startTime: new Date(element.startTime),
                    details: element.details,
                    title: element.title,
                    interviewType: element.interviewType,
                    overallScore: element.overallScore,
                    status: element.status,
                    targetUsername: element.targetUsername
                })
            });
            setFeedbackDataForUI(bufferFeedbackData);
        }

    }, [feedbacks]);


    return (
        <Stack sx={{
            maxWidth: 1500,
            display: "flex", flexDirection: 'column', alignItems: 'center',
            paddingTop: 5, paddingBottom: 20, paddingX: 2,

        }}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{
                            backgroundColor: '#000000', color: '#FFFFFF', fontWeight: 550
                        }}>
                            <TableCell />
                            <TableCell align="left" sx={{ color: 'inherit', fontWeight: 'inherit' }}>Date</TableCell>
                            <TableCell align="left" sx={{ color: 'inherit', fontWeight: 'inherit' }}>Type</TableCell>
                            <TableCell align="left" sx={{ color: 'inherit', fontWeight: 'inherit' }}>Feedback</TableCell>
                            <TableCell align="right" sx={{ color: 'inherit', fontWeight: 'inherit' }}></TableCell>
                            <TableCell align="right" sx={{ color: 'inherit', fontWeight: 'inherit' }}>Overall</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {feedbackDataForUI.filter((row, i) => (rowsPerPage * page <= i && i < rowsPerPage * (page + 1))).map((row) => (
                            <Row key={row._id} row={row} />
                        ))}
                    </TableBody>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        count={feedbackDataForUI.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Table>
            </TableContainer>

        </Stack >
    );
}
