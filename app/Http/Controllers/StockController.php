<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StockController extends Controller
{
    public function search(Request $request)
    {
    	$qurey = $request['qurey'];
    	$file = file_get_contents('https://s.yimg.com/xb/v7/finance/autocomplete?appid=finance.yahoo.com&nresults=10&output=yjsonp&region=US&lang=en-US&corsDomain=https%3A%2F%2Fin.finance.yahoo.com&query='.$qurey);
	    $req = json_decode($file);
		$result = $req->ResultSet->Result;
		// dd($result);
		return response()->json(['result'=>$result]);

    }

    public function graph(Request $request)
    {
    	$index = $request['index'];
    	$file = file_get_contents('https://query1.finance.yahoo.com/v7/finance/spark?symbols='.$index.'&range=1d&interval=1m&indicators=close');
                      $data = json_decode($file);
                      $preClose = $data->spark->result[0]->response[0]->meta->previousClose;
                      $symbol = $data->spark->result[0]->response[0]->meta->symbol;
                      $gmtoffset = $data->spark->result[0]->response[0]->meta->gmtoffset;
                      $time = $data->spark->result[0]->response[0]->timestamp;
                      $value = $data->spark->result[0]->response[0]->indicators->quote[0]->close;
                      $change = $value[count($value)-1] - $preClose;
                      $avg = ($change/$preClose)*100;
                      $values = ['change'=>round($change,2),'avg'=>round($avg,2),'symbol'=>$symbol];
                      $processData = [];
                      $select = 0;
                      for ($i=0; $i < count($time); $i++) {
                      	if ($value[$i] != null) {
                      		$select = $value[$i]; 
                      	}
                          $data = [
                          			(($time[$i] + $gmtoffset)* 1000),
                          			$select
                          		];
                          array_push($processData, $data);
                      }
	      return response()->json(['msg' => '1', 'data' => $processData, 'value' => $values]);
    }

}
