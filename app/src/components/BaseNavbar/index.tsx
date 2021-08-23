import React, { useCallback } from "react";
import { useHistory } from 'react-router-dom';
import {
    makeStyles,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Drawer,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import {
    Menu,
    ExitToApp,
    AccountCircle,
    ChevronLeft,
    Home,
    Room,
    PersonAdd,
    Business,
    BarChart,
} from '@material-ui/icons';
import clsx from 'clsx';

import { useMenu } from '../../hooks/MenuContext';

import { 
    ContentLogo,
    UserLogin
} from './styles';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
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
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    itemsToolBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    drawerPaper: {
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        height: '100%',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    active: {
        color: '#074583',
        fontWeight: 'bold',
        borderLeft: '5px solid #074583',
        backgroundColor: '#D6E0EB',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
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
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
}));

interface NavBarProps {
    pageActive: string;
}

const BaseNavbar: React.FC<NavBarProps> = ({ pageActive, children }) => {
    const classes = useStyles();
    const { show, setShow } = useMenu();
    const history = useHistory();

    const handlePushPage = useCallback((page: string) => {
        history.push(`/${page}`);
    }, [history]);

    return (
      <div className={classes.root}>
            <AppBar
                position='absolute'
                className={
                    clsx(
                        classes.appBar,
                        show && classes.appBarShift
                    )
                }
            >
                <Toolbar
                    className={clsx(classes.toolBar)}
                >
                  <div className={clsx(classes.itemsToolBar)}>
                      {!show && 
                          <IconButton
                              edge="start"
                              color="inherit"
                              onClick={() => setShow()}
                          >
                              <Menu />
                          </IconButton>
                      }
                      <ContentLogo>
                        <h2>Oberon</h2>
                      </ContentLogo>
                  </div>

                  <div className={clsx(classes.itemsToolBar)}>
                      <UserLogin>
                          <div>
                              <p>Usuário</p>
                              <p>Empresa</p>
                          </div>
                          <AccountCircle />
                      </UserLogin>
                      <Button
                          variant='contained'
                          type='button'
                          color='secondary'
                          endIcon={<ExitToApp />}
                          onClick={() => {}}
                          >
                          Sair
                      </Button>
                  </div>
              </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={show}
                className={clsx(classes.drawer, {
                  [classes.drawerOpen]: show,
                  [classes.drawerClose]: !show,
                })}
                classes={{
                  paper: clsx({
                    [classes.drawerOpen]: show,
                    [classes.drawerClose]: !show,
                  }),
                }}
            >
            <div className={classes.toolbar}>
                <IconButton onClick={() => setShow()}>
                    <ChevronLeft />
                </IconButton>
            </div>
            <Divider />
            <ListItem 
                button
                className={ pageActive === 'home' ? 
                clsx(classes.active) : '' } 
                onClick={() => handlePushPage('home')}
            >
                <ListItemIcon>
                <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>

            <ListItem 
                button
                className={ pageActive === 'enterprise' ? 
                clsx(classes.active) : '' } 
                onClick={() => handlePushPage('enterprise')}
            >
                <ListItemIcon>
                <Business />
                </ListItemIcon>
                <ListItemText primary="Empresa" />
            </ListItem>
            
            <ListItem 
                button
                className={ pageActive === 'user' ? 
                clsx(classes.active) : '' } 
                onClick={() => handlePushPage('user')}
            >
                <ListItemIcon>
                <PersonAdd />
                </ListItemIcon>
                <ListItemText primary="Usuário" />
            </ListItem>

            <ListItem 
                button
                className={ pageActive === 'route' ?
                clsx(classes.active) : '' } 
                onClick={() => handlePushPage('route')}
            >
                <ListItemIcon>
                <Room />
                </ListItemIcon>
                <ListItemText primary="Rota" />
            </ListItem>

            <ListItem 
                button
                className={ pageActive === 'analytics' ?
                clsx(classes.active) : '' } 
                onClick={() => handlePushPage('analytics')}
            >
                <ListItemIcon>
                <BarChart />
                </ListItemIcon>
                <ListItemText primary="Analises" />
            </ListItem>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {children}
            </main>
    </div>
    );
}

export default BaseNavbar;