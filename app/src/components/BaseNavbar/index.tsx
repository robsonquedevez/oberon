import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Drawer,
    AppBar,
    Toolbar,
    List,
    CssBaseline,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    createStyles, 
    makeStyles, 
    useTheme, 
    Theme,
    Button
} from '@material-ui/core';
import {
    Business,
    PersonAdd,
    Home,
    Room,
    BarChart,
    Menu,
    ChevronLeft,
    ChevronRight,
    ExitToApp
} from '@material-ui/icons';
import clsx from 'clsx';
import { useMenu } from '../../hooks/MenuContext';

import oberonSm from '../../assets/images/OberonSm.svg';

import { 
    LogoSm,
    ContentLogo
} from './styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    btnLogout: {
        position: 'absolute',
        right: 26,
    }
  }),
);

const BaseNavbar:React.FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const { show, setShow } = useMenu();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = useCallback(() => {
    history.push('/');
  }, [history]);

  const handlePushPageMenu = useCallback((page: string) => {
    history.push(`/${page}`);
  }, [history]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={
          clsx(classes.appBar, 
              show && {[classes.appBarShift]: open},
            
          )
        }
      >
        <Toolbar>
            
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <ContentLogo>
            <LogoSm src={oberonSm} />
            <h2>Oberon</h2>
          </ContentLogo>
          <Button
            color='secondary'
            variant='contained'
            endIcon={<ExitToApp />}
            className={classes.btnLogout}
            onClick={handleLogout}
          >
              Sair
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>

            <ListItem button onClick={() => handlePushPageMenu('home')}>
              <ListItemIcon> <Home /></ListItemIcon>
              <ListItemText>Início</ListItemText>
            </ListItem>
          
            <ListItem button onClick={() => handlePushPageMenu('enterprise')}>
              <ListItemIcon> <Business /></ListItemIcon>
              <ListItemText>Empresa</ListItemText>
            </ListItem>

            <ListItem button >
              <ListItemIcon> <PersonAdd /></ListItemIcon>
              <ListItemText>Usuário</ListItemText>
            </ListItem>           

            <ListItem button >
              <ListItemIcon> <Room /></ListItemIcon>
              <ListItemText>Rota</ListItemText>
            </ListItem>

            <ListItem button >
              <ListItemIcon> <BarChart /></ListItemIcon>
              <ListItemText>Analise</ListItemText>
            </ListItem>
         
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default BaseNavbar;
