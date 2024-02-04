import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Danger from "components/Typography/Danger.js";
import Success from "components/Typography/Success.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import styled from 'styled-components';
import Box from "@material-ui/core/Box";
import api from "utils/api";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import { useHistory } from 'react-router-dom';

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0.5px  #000",
  boxShadow: 24,
  p: 4,
};

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  tableUpgradeWrapper: {
    display: "block",
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    MsOverflowStyle: "-ms-autohiding-scrollbar"
  },
  table: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: "1rem",
    backgroundColor: "transparent",
    borderCollapse: "collapse",
    display: "table",
    borderSpacing: "2px",
    borderColor: "grey",
    "& thdead tr th": {
      fontSize: "1.063rem",
      padding: "12px 8px",
      verticalAlign: "middle",
      fontWeight: "300",
      borderTopWidth: "0",
      borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      textAlign: "inherit"
    },
    "& tbody tr td": {
      padding: "12px 8px",
      verticalAlign: "middle",
      borderTop: "1px solid rgba(0, 0, 0, 0.06)"
    },
    "& td, & th": {
      display: "table-cell"
    }
  },
  center: {
    textAlign: "center"
  }
};

const useStyles = makeStyles(styles);

export default function UpgradeToPro() {
  const history = useHistory();
  const classes = useStyles();
  const [file, setFile] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    history.push({
      pathname: "/user/doctors",
      search: `?query=Sleep Specialist`,
    });
  };

  const adminFileUpload = 'http://127.0.0.1:8000/ecg/predict'
  
  return (
    <>
    <StyledFlex>
      <div>
        Allow access to daily user analytics and share data?
      </div>
      <form method="POST" action={adminFileUpload} enctype="multipart/form-data" >
          <input type='file' name="file" onChange={e => setFile(e.target.files[0])}/>
          <Button color={'primary'} type="submit">Submit</Button>
      </form>
      {/* <input type="file" onChange={e => setFile(e.target.files[0])}/>
      <Button color={"primary"} onClick={async () => {
        const res = await api.fetchSleepAnalytics(file);

        if(true){
          history.push({
            pathname: "/user/doctors",
            search: `?query=Sleep Specialist`,
          });
        }
      }}>Submit</Button> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Considering your symptoms, you should consult a Sleep Specialist.
          </Typography>
          <Button
            color="warning"
            onClick={() => {
              handleClose();
            }}
            style={{
              marginRight: "10%",
              marginTop: "10px"
            }}
          >
            View All Doctors
          </Button>
          <Button
            color="warning"
            onClick={() => {
              cancelModal();
            }}
            style={{
              marginTop: "10px"
            }}
          >
            Cancel
          </Button>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your profile has been updated successfully
          </Typography> */}
        </Box>
      </Modal>
    </StyledFlex>

    <StyledHeader>Why should you sleep well?</StyledHeader>
    <StyledColFlex>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/MBVpK4EiwmM?si=1ZJAnSk_25HxAUKy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

      <iframe width="560" height="315" src="https://www.youtube.com/embed/iMfsa7ntJZE?si=IJ1mkikTPJeBzgTb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

      <iframe width="560" height="315" src="https://www.youtube.com/embed/P_i6yqWjASk?si=YQ0hLkuDy6qcGLkj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </StyledColFlex>
    </>
  );
}

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

const StyledColFlex = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

const StyledHeader = styled.div`
  margin-top: 12px;
  font-size: 28px;
`;