<?php

namespace App\Filament\Resources\MemberReports\Pages;

use App\Filament\Resources\MemberReports\MemberReportResource;
use Filament\Resources\Pages\ViewRecord;

class ViewMemberReport extends ViewRecord
{
    protected static string $resource = MemberReportResource::class;

    protected function getHeaderActions(): array
    {
        return []; // no edit/delete
    }
}