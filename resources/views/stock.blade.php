<!DOCTYPE html>
<html lang="en">
<head>
  <title>Stock Track</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script
  src="https://code.jquery.com/jquery-3.3.1.js"
  integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
  crossorigin="anonymous"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <link href="css/stock.css" rel="stylesheet">
</head>
<body>
  
<div class="container">
  <div class="row">
    <div class="col-md-12 m-t-10">
        <form>
          <div class="input-group input-group-lg">
            <input type="text" class="form-control" placeholder="Enter Stock Name" id="search-text">
          </div>
        </form>
    </div>
    <div class="col-md-12 col-sm-12 col-xs-12 detail">
    </div>
  </div>
</div>

<!-- Modal -->
<div id="graph-view" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header col-lg-12">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title col-lg-12" id="graph-name">Modal Header</h4>
      </div>
      <div class="modal-body col-lg-12">
        <!-- <p>Some text in the modal.</p> -->
        <div class="col-lg-12" id="chart-view"></div>
      </div>
<!--       <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div> -->
    </div>

  </div>
</div>
<script type="text/javascript" src="js/stock.js"></script>
<script type="text/javascript" src = "js/highstock.js"></script>
</body>
</html>

